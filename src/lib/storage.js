import { supabase } from "./supabase";

// local storage keys
const KEYS = {
  PROGRESS: "nihongo_progress",
  QUIZ_SCORES: "nihongo_quiz_scores",
  STREAK: "nihongo_streak",
  MILESTONES: "nihongo_milestones",
  SETTINGS: "nihongo_settings",
};

// Helper to get local data
function getLocal(key, defaultValue) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

// Helper to set local data
function setLocal(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

export const Storage = {
  // --- Progress Tracking (lessons, kana, kanji completion) ---
  async getProgress() {
    const localProgress = getLocal(KEYS.PROGRESS, {});
    
    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("progress")
            .select("*")
            .eq("user_id", user.id);
          
          if (!error && data) {
            // merge data into a map
            const dbProgress = {};
            data.forEach((p) => {
              dbProgress[`${p.level}_${p.lesson_id || "general"}`] = {
                status: p.status,
                score: p.score,
                metadata: p.metadata_json
              };
            });
            return { ...localProgress, ...dbProgress };
          }
        }
      } catch (err) {
        console.error("Supabase progress fetch failed:", err);
      }
    }
    return localProgress;
  },

  async updateProgress(level, itemType, itemId, status = "completed", metadata = {}) {
    const localProgress = getLocal(KEYS.PROGRESS, {});
    const progressKey = `${level}_${itemType}_${itemId}`;
    const timestamp = new Date().toISOString();
    
    localProgress[progressKey] = {
      status,
      timestamp,
      metadata
    };
    setLocal(KEYS.PROGRESS, localProgress);

    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error } = await supabase
            .from("progress")
            .upsert({
              user_id: user.id,
              level,
              status,
              metadata_json: { itemType, itemId, timestamp, ...metadata }
            });
          if (error) console.error("Supabase progress update failed:", error);
        }
      } catch (err) {
        console.error("Supabase progress update failed:", err);
      }
    }
    return localProgress;
  },

  // --- Quiz Scores & History ---
  async getQuizScores() {
    return getLocal(KEYS.QUIZ_SCORES, []);
  },

  async saveQuizScore(level, quizType, score, total) {
    const scores = getLocal(KEYS.QUIZ_SCORES, []);
    const record = {
      id: Math.random().toString(36).substring(2, 9),
      level,
      quizType,
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timestamp: new Date().toISOString()
    };
    
    scores.unshift(record);
    // keep last 50 scores
    if (scores.length > 50) scores.pop();
    setLocal(KEYS.QUIZ_SCORES, scores);

    if (supabase) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error } = await supabase
            .from("progress")
            .insert({
              user_id: user.id,
              level,
              status: "quiz_completed",
              score: record.percentage,
              metadata_json: { quizType, score, total, timestamp: record.timestamp }
            });
          if (error) console.error("Supabase quiz save failed:", error);
        }
      } catch (err) {
        console.error("Supabase quiz save failed:", err);
      }
    }
    return scores;
  },

  // --- Streaks ---
  getStreak() {
    const streakData = getLocal(KEYS.STREAK, { count: 0, lastDate: null });
    const today = new Date().toISOString().split("T")[0];
    
    if (streakData.lastDate === today) {
      return streakData.count;
    }
    
    // Check if streak was yesterday
    if (streakData.lastDate) {
      const last = new Date(streakData.lastDate);
      const now = new Date(today);
      const diffTime = Math.abs(now - last);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        // streak broken
        return 0;
      }
    }
    return streakData.count;
  },

  incrementStreak() {
    const streakData = getLocal(KEYS.STREAK, { count: 0, lastDate: null });
    const today = new Date().toISOString().split("T")[0];
    
    if (streakData.lastDate === today) {
      return streakData.count; // already incremented today
    }
    
    let newCount = 1;
    if (streakData.lastDate) {
      const last = new Date(streakData.lastDate);
      const now = new Date(today);
      const diffTime = Math.abs(now - last);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newCount = streakData.count + 1;
      }
    }
    
    const newStreak = { count: newCount, lastDate: today };
    setLocal(KEYS.STREAK, newStreak);
    return newCount;
  },

  // --- Milestones/Badges ---
  getCompletedMilestones() {
    return getLocal(KEYS.MILESTONES, []);
  },

  completeMilestone(milestoneId) {
    const completed = getLocal(KEYS.MILESTONES, []);
    if (!completed.includes(milestoneId)) {
      completed.push(milestoneId);
      setLocal(KEYS.MILESTONES, completed);
    }
    return completed;
  }
};
