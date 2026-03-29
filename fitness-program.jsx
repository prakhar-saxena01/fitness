import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .fp { font-family: 'Barlow', sans-serif; background: #0c0c0c; color: #e0e0e0; min-height: 100vh; }
  .fp-header { background: #111; border-bottom: 3px solid #F59E0B; padding: 20px 22px 18px; }
  .fp-title { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 900; letter-spacing: 3px; color: #fff; text-transform: uppercase; }
  .fp-sub { font-size: 11px; color: #666; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 3px; }
  .stats-row { display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; }
  .stat { background: #1a1a1a; padding: 8px 14px; border-left: 3px solid #F59E0B; }
  .stat-val { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; color: #F59E0B; }
  .stat-lbl { font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: 1px; }
  
  .tabs { display: flex; background: #111; border-bottom: 1px solid #1e1e1e; overflow-x: auto; scrollbar-width: none; }
  .tabs::-webkit-scrollbar { display: none; }
  .tab { padding: 13px 14px; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; white-space: nowrap; color: #444; border-bottom: 3px solid transparent; transition: all 0.2s; }
  .tab:hover { color: #888; }
  .tab.active { color: #F59E0B; border-bottom-color: #F59E0B; }

  .content { padding: 20px; max-width: 700px; }
  .s-title { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #fff; margin-bottom: 2px; }
  .s-sub { font-size: 11px; color: #555; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 20px; }

  .alert { background: #1a1106; border: 1px solid #F59E0B33; border-left: 3px solid #F59E0B; padding: 14px 16px; margin-bottom: 20px; }
  .alert-title { font-size: 10px; font-weight: 700; color: #F59E0B; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px; }
  .alert-text { font-size: 12px; color: #aaa; line-height: 1.7; }

  .day-card { background: #111; border: 1px solid #1e1e1e; margin-bottom: 10px; }
  .day-hd { display: flex; justify-content: space-between; align-items: center; padding: 13px 16px; }
  .day-name { font-family: 'Barlow Condensed', sans-serif; font-size: 17px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #fff; }
  .badge { font-size: 10px; padding: 3px 9px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; }
  .badge-s { background: #F59E0B1a; color: #F59E0B; border: 1px solid #F59E0B33; }
  .badge-c { background: #3B82F61a; color: #3B82F6; border: 1px solid #3B82F633; }
  .badge-m { background: #10B9811a; color: #10B981; border: 1px solid #10B98133; }
  .badge-r { background: #2221; color: #555; border: 1px solid #2223; }
  .day-desc { font-size: 12px; color: #666; padding: 0 16px 13px; line-height: 1.6; border-top: 1px solid #1a1a1a; padding-top: 10px; }

  .w-card { background: #111; border: 1px solid #1e1e1e; margin-bottom: 20px; }
  .w-hd { background: #F59E0B; padding: 14px 18px; }
  .w-title { font-family: 'Barlow Condensed', sans-serif; font-size: 19px; font-weight: 900; color: #000; text-transform: uppercase; letter-spacing: 2px; }
  .w-days { font-size: 11px; color: #0009; font-weight: 600; margin-top: 2px; }
  .warmup { padding: 12px 18px; background: #151515; border-bottom: 1px solid #1e1e1e; }
  .warmup-title { font-size: 10px; font-weight: 700; color: #F59E0B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .warmup-text { font-size: 12px; color: #666; }
  .ex-row { display: flex; align-items: center; gap: 14px; padding: 12px 18px; border-bottom: 1px solid #161616; }
  .ex-row:last-child { border-bottom: none; }
  .ex-n { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 900; color: #2a2a2a; min-width: 26px; }
  .ex-info { flex: 1; }
  .ex-name { font-size: 13px; font-weight: 600; color: #ddd; }
  .ex-tip { font-size: 11px; color: #555; margin-top: 2px; line-height: 1.4; }
  .ex-sets { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; color: #F59E0B; text-align: right; white-space: nowrap; }

  .mob-section { margin-bottom: 22px; }
  .mob-s-title { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #10B981; border-bottom: 1px solid #1e1e1e; padding-bottom: 8px; margin-bottom: 12px; }
  .mob-ex { padding: 10px 0; border-bottom: 1px solid #161616; }
  .mob-ex:last-child { border-bottom: none; }
  .mob-ex-name { font-size: 13px; font-weight: 600; color: #ddd; }
  .mob-ex-detail { font-size: 11px; color: #555; margin-top: 3px; }
  .mob-note { font-size: 11px; color: #F59E0B99; font-style: italic; margin-top: 3px; }

  .macro-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 22px; }
  .macro { background: #1a1a1a; padding: 14px 8px; text-align: center; border-bottom: 3px solid; }
  .macro.cal { border-color: #F59E0B; }
  .macro.pro { border-color: #3B82F6; }
  .macro.fat { border-color: #EC4899; }
  .macro.carb { border-color: #10B981; }
  .macro-val { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 900; }
  .macro.cal .macro-val { color: #F59E0B; }
  .macro.pro .macro-val { color: #3B82F6; }
  .macro.fat .macro-val { color: #EC4899; }
  .macro.carb .macro-val { color: #10B981; }
  .macro-lbl { font-size: 9px; color: #555; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

  .n-card { background: #111; border: 1px solid #1e1e1e; padding: 18px; margin-bottom: 16px; }
  .n-title { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #F59E0B; border-bottom: 1px solid #1e1e1e; padding-bottom: 10px; margin-bottom: 14px; }
  .meal-item { padding: 10px 0; border-bottom: 1px solid #161616; }
  .meal-item:last-child { border-bottom: none; }
  .meal-time { font-size: 10px; font-weight: 700; color: #F59E0B; text-transform: uppercase; letter-spacing: 1px; }
  .meal-content { font-size: 13px; color: #ddd; margin-top: 4px; font-weight: 500; }
  .meal-eg { font-size: 11px; color: #555; margin-top: 3px; font-style: italic; }

  .rule-item { display: flex; gap: 14px; padding: 11px 0; border-bottom: 1px solid #161616; align-items: flex-start; }
  .rule-item:last-child { border-bottom: none; }
  .rule-n { font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 900; color: #F59E0B; min-width: 24px; line-height: 1; padding-top: 3px; }
  .rule-text { font-size: 13px; color: #bbb; line-height: 1.6; }
  .rule-bold { color: #fff; font-weight: 600; }

  .phase-block { background: #111; border: 1px solid #1e1e1e; padding: 18px; margin-bottom: 16px; }
  .phase-title { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #fff; margin-bottom: 14px; }
  .phase-item { display: flex; gap: 14px; padding: 10px 0; border-bottom: 1px solid #161616; align-items: flex-start; }
  .phase-item:last-child { border-bottom: none; }
  .phase-badge { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 900; color: #F59E0B; background: #F59E0B1a; border: 1px solid #F59E0B33; padding: 3px 9px; white-space: nowrap; height: fit-content; }
  .phase-text { font-size: 13px; color: #bbb; line-height: 1.6; }
  .phase-text strong { color: #fff; }

  .cardio-card { background: #111; border: 1px solid #1e1e1e; margin-bottom: 20px; }
  .cardio-hd { background: #3B82F6; padding: 14px 18px; }
  .cardio-title { font-family: 'Barlow Condensed', sans-serif; font-size: 19px; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 2px; }
  .cardio-days { font-size: 11px; color: #ffffffaa; font-weight: 600; margin-top: 2px; }
  .cardio-block { padding: 16px 18px; border-bottom: 1px solid #1e1e1e; }
  .cardio-block:last-child { border-bottom: none; }
  .cardio-block-title { font-size: 11px; font-weight: 700; color: #3B82F6; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .cardio-ex { padding: 8px 0; border-bottom: 1px solid #161616; }
  .cardio-ex:last-child { border-bottom: none; }
  .cardio-ex-name { font-size: 13px; font-weight: 600; color: #ddd; }
  .cardio-ex-detail { font-size: 11px; color: #555; margin-top: 2px; }
`;

const workoutA = [
  { name: "Goblet Squat", sets: "3 × 10", tip: "Hold DB/KB at chest. Squat deep, knees track over toes. Slow down (3s)." },
  { name: "Dumbbell Romanian Deadlift", sets: "3 × 10", tip: "Hinge at hips, soft knee bend. Keep DBs close to legs. Feel hamstring stretch." },
  { name: "Single-Arm DB Row", sets: "3 × 10 each", tip: "Brace on bench. Pull elbow back past torso. Squeeze lat at top." },
  { name: "Lat Pulldown (wide grip)", sets: "3 × 12", tip: "Lean back slightly. Pull bar to upper chest. Control the return." },
  { name: "Incline Push-up", sets: "3 × 10", tip: "Hands on bench/surface. Full range of motion. Lower chest to surface." },
  { name: "Dead Bug", sets: "3 × 8 each", tip: "Lower back pressed to floor. Extend opposite arm/leg slowly. Breathe out." },
  { name: "Glute Bridge", sets: "3 × 15", tip: "Feet flat, drive hips up, squeeze glutes at top for 1 second." },
];

const workoutB = [
  { name: "Reverse (Step-Back) Lunge", sets: "3 × 10 each", tip: "Step back, lower rear knee toward floor. Front shin stays vertical." },
  { name: "Sumo Dumbbell Deadlift", sets: "3 × 10", tip: "Wide stance, toes out. Hold DB vertically. Push floor away as you rise." },
  { name: "Lat Pulldown (close grip)", sets: "3 × 12", tip: "Palms face each other. Pull elbows down and in. Chest tall throughout." },
  { name: "Dumbbell Floor Press", sets: "3 × 10", tip: "Lying on floor. Elbows at 45°. Press to lockout, slow return. Safe for shoulders." },
  { name: "Side-Lying Clamshell", sets: "3 × 15 each", tip: "Hips stacked, feet together. Rotate top knee up like a clamshell. Glute focus." },
  { name: "Bird Dog", sets: "3 × 10 each", tip: "On all fours, extend opposite arm + leg. Hold 2s. Avoid rotating hips." },
  { name: "Cat-Cow Stretch", sets: "2 × 10 reps", tip: "Slow and controlled. Breathe in on cow (arch), out on cat (round). Thoracic focus." },
];

const workoutC = [
  { name: "Goblet Squat (deeper)", sets: "3 × 12", tip: "Progress from Workout A — aim for deeper depth each week." },
  { name: "KB / DB Hip Hinge", sets: "3 × 12", tip: "Master the hinge pattern. Weight between feet. Sit hips back, keep spine neutral." },
  { name: "Chest-Supported DB Row", sets: "3 × 10 each", tip: "Lie face-down on incline bench. Removes spinal load — great for scoliosis." },
  { name: "Lat Pulldown", sets: "3 × 12", tip: "Alternate grip each session (wide / close). Maintain tall chest." },
  { name: "Push-up (progress from incline)", sets: "3 × 10", tip: "Work toward floor push-up. If too hard, use a lower surface than week 1." },
  { name: "Plank", sets: "3 × 30 sec", tip: "Forearms flat. Hips level. Breathe steadily. Don't let lower back sag." },
  { name: "Hip Flexor Kneeling Stretch", sets: "2 × 45 sec each", tip: "Lunge position, back knee down. Tuck pelvis under, feel front hip stretch." },
];

const mobilityRoutine = [
  { category: "Cervical (Neck) — Gentle Only", exercises: [
    { name: "Cervical Side Tilt", detail: "2 × 30 sec each side", note: "Ear toward shoulder — NO rotation or circles. Let gravity do the work." },
    { name: "Chin Tuck", detail: "3 × 10 reps", note: "Pull chin straight back. Corrects forward head posture. Hold 3 sec each." },
  ]},
  { category: "Thoracic Spine (Upper Back)", exercises: [
    { name: "Cat-Cow on All Fours", detail: "2 × 12 reps", note: "Slow and deliberate. Focus on thoracic extension, not lumbar." },
    { name: "Thread the Needle", detail: "2 × 8 each side", note: "Gentle rotation drill for thoracic mobility. Don't force range of motion." },
    { name: "Thoracic Extension (floor)", detail: "2 × 60 sec", note: "Lie on back, arms crossed on chest. Let thoracic spine extend over ground." },
  ]},
  { category: "Hips & Legs", exercises: [
    { name: "90/90 Hip Stretch", detail: "2 × 45 sec each side", note: "Both legs at 90°. Sit tall. Alternate leaning forward on each side." },
    { name: "Hip Flexor Kneeling Stretch", detail: "2 × 45 sec each", note: "Back knee down, tuck pelvis. This combats sitting-related tightness." },
    { name: "Hamstring Doorway Stretch", detail: "2 × 30 sec each", note: "Lie in doorway, extend leg up the frame. Relax and breathe." },
    { name: "World's Greatest Stretch", detail: "5 reps each side", note: "Combines hip flexor + thoracic + hamstring. Slow and intentional." },
  ]},
  { category: "Shoulder & Scapula", exercises: [
    { name: "Shoulder Pendulum Swings", detail: "2 × 30 sec each arm", note: "Let arm hang freely, small circles. Gentle joint mobilization." },
    { name: "Band Pull-Aparts (or arm across chest)", detail: "2 × 15 reps", note: "Targets rear deltoid and scapular retraction. Key for posture." },
    { name: "Wall Slide", detail: "2 × 10 reps", note: "Back flat on wall, arms slide up like a snow angel. Scapular stability." },
  ]},
];

const weekSchedule = [
  { day: "Monday", type: "strength", label: "STRENGTH A", desc: "Full body — Squat, hinge, pull, push, core. Foundation movements." },
  { day: "Tuesday", type: "cardio", label: "CARDIO + CORE", desc: "25–30 min cycling (Zone 2) + core circuit. Active recovery from Monday." },
  { day: "Wednesday", type: "strength", label: "STRENGTH B", desc: "Full body — Lunges, deadlift variation, floor press, lat pull, stability work." },
  { day: "Thursday", type: "mobility", label: "MOBILITY DAY", desc: "45 min full-body mobility routine. Priority: thoracic spine, hips, cervical care." },
  { day: "Friday", type: "strength", label: "STRENGTH C", desc: "Full body — Consolidate week, progress weights/depth from Mon & Wed." },
  { day: "Saturday", type: "cardio", label: "CARDIO + CORE", desc: "25–30 min cycling (Zone 2) + core circuit. Keep intensity moderate." },
  { day: "Sunday", type: "rest", label: "REST", desc: "Full rest or gentle walk. Your 10k steps count here. No structured training." },
];

const typeMap = {
  strength: "badge-s",
  cardio: "badge-c",
  mobility: "badge-m",
  rest: "badge-r",
};

export default function FitnessProgram() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="fp">
      <style>{styles}</style>

      <div className="fp-header">
        <div className="fp-title">Your Fitness Program</div>
        <div className="fp-sub">Strength · Fat Loss · Mobility — Beginner Foundation</div>
        <div className="stats-row">
          <div className="stat"><div className="stat-val">98 kg</div><div className="stat-lbl">Current</div></div>
          <div className="stat"><div className="stat-val">178 cm</div><div className="stat-lbl">Height</div></div>
          <div className="stat"><div className="stat-val">6 days</div><div className="stat-lbl">Training</div></div>
          <div className="stat"><div className="stat-val">10k</div><div className="stat-lbl">Steps/day</div></div>
        </div>
      </div>

      <div className="tabs">
        {[
          { id: "overview", label: "Weekly Plan" },
          { id: "strength", label: "Strength" },
          { id: "cardio", label: "Cardio" },
          { id: "mobility", label: "Mobility" },
          { id: "nutrition", label: "Nutrition" },
        ].map(t => (
          <div key={t.id} className={`tab${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>

      <div className="content">
        {/* OVERVIEW */}
        {tab === "overview" && (
          <div>
            <div className="s-title">Weekly Structure</div>
            <div className="s-sub">6 training days · 1 rest day</div>

            <div className="alert">
              <div className="alert-title">⚠ Scoliosis Protocol</div>
              <div className="alert-text">
                Due to cervical/upper thoracic scoliosis: <strong style={{color:"#F59E0B"}}>no heavy overhead pressing</strong>, no behind-the-neck movements, and no asymmetrical spinal loading. All exercises are selected with this in mind. If any movement causes neck or shoulder pain — stop immediately and substitute with a row or lat pulldown variation.
              </div>
            </div>

            {weekSchedule.map(d => (
              <div className="day-card" key={d.day}>
                <div className="day-hd">
                  <div className="day-name">{d.day}</div>
                  <div className={`badge ${typeMap[d.type]}`}>{d.label}</div>
                </div>
                <div className="day-desc">{d.desc}</div>
              </div>
            ))}

            <div className="phase-block" style={{marginTop: 24}}>
              <div className="phase-title">Progression Phases</div>
              <div className="phase-item">
                <div className="phase-badge">WEEKS 1–4</div>
                <div className="phase-text"><strong>Foundation.</strong> Learn the movements. Don't chase heavy weights. Focus on form, full range of motion, consistency. Aim to complete every session.</div>
              </div>
              <div className="phase-item">
                <div className="phase-badge">WEEKS 5–8</div>
                <div className="phase-text"><strong>Build.</strong> Add 1–2 reps or small weight increases where comfortable. Begin noticing real strength gains. Mobility sessions should feel easier.</div>
              </div>
              <div className="phase-item">
                <div className="phase-badge">WEEKS 9–12</div>
                <div className="phase-text"><strong>Consolidate.</strong> Track your weights. Push effort levels to 7–8/10. Re-assess body composition and strength benchmarks at week 12.</div>
              </div>
            </div>
          </div>
        )}

        {/* STRENGTH */}
        {tab === "strength" && (
          <div>
            <div className="s-title">Strength Workouts</div>
            <div className="s-sub">3 days/week · Full body · Mon / Wed / Fri</div>

            <div className="alert">
              <div className="alert-title">General Rules</div>
              <div className="alert-text">
                Rest 60–90 sec between sets. Start light — form over weight, always. If a movement causes shoulder or neck discomfort, replace it with an extra row or lat pulldown set. Increase weight only when you can complete all reps with clean form.
              </div>
            </div>

            {[
              { title: "Workout A", days: "Monday", exercises: workoutA, color: "#F59E0B" },
              { title: "Workout B", days: "Wednesday", exercises: workoutB, color: "#F59E0B" },
              { title: "Workout C", days: "Friday", exercises: workoutC, color: "#F59E0B" },
            ].map(w => (
              <div className="w-card" key={w.title}>
                <div className="w-hd">
                  <div className="w-title">{w.title}</div>
                  <div className="w-days">{w.days}</div>
                </div>
                <div className="warmup">
                  <div className="warmup-title">Warm-up — 5 min</div>
                  <div className="warmup-text">March in place → arm circles (forward + back) → cat-cow × 8 → hip circles × 8 each side → 2 min light cycle or walk</div>
                </div>
                {w.exercises.map((ex, i) => (
                  <div className="ex-row" key={i}>
                    <div className="ex-n">{String(i + 1).padStart(2, "0")}</div>
                    <div className="ex-info">
                      <div className="ex-name">{ex.name}</div>
                      <div className="ex-tip">{ex.tip}</div>
                    </div>
                    <div className="ex-sets">{ex.sets}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* CARDIO */}
        {tab === "cardio" && (
          <div>
            <div className="s-title">Cardio + Core</div>
            <div className="s-sub">2 days/week · Tue & Sat · ~45 min total</div>

            <div className="alert">
              <div className="alert-title">Zone 2 Target</div>
              <div className="alert-text">
                Zone 2 = you can hold a conversation but it's slightly uncomfortable. This is where fat burning is maximised and aerobic capacity is built without trashing recovery. Combined with your 10k daily steps, this is a powerful fat loss engine.
              </div>
            </div>

            <div className="cardio-card">
              <div className="cardio-hd">
                <div className="cardio-title">Cycle Session</div>
                <div className="cardio-days">Tuesday & Saturday</div>
              </div>
              <div className="cardio-block">
                <div className="cardio-block-title">Cycle — 25 to 30 min</div>
                <div className="cardio-ex">
                  <div className="cardio-ex-name">Warm-up</div>
                  <div className="cardio-ex-detail">5 min easy pace — light resistance, get blood moving</div>
                </div>
                <div className="cardio-ex">
                  <div className="cardio-ex-name">Steady State</div>
                  <div className="cardio-ex-detail">15–20 min at Zone 2 effort — conversational but working. Moderate resistance.</div>
                </div>
                <div className="cardio-ex">
                  <div className="cardio-ex-name">Cool Down</div>
                  <div className="cardio-ex-detail">5 min very easy — slow your breathing, reduce resistance to zero</div>
                </div>
              </div>
              <div className="cardio-block">
                <div className="cardio-block-title">Core Circuit — 3 rounds, no rest between exercises</div>
                <div className="cardio-ex">
                  <div className="cardio-ex-name">Dead Bug</div>
                  <div className="cardio-ex-detail">8 reps each side — lower back pressed to floor throughout</div>
                </div>
                <div className="cardio-ex">
                  <div className="cardio-ex-name">Plank</div>
                  <div className="cardio-ex-detail">30 seconds — forearms down, hips level, breathe steadily</div>
                </div>
                <div className="cardio-ex">
                  <div className="cardio-ex-name">Glute Bridge</div>
                  <div className="cardio-ex-detail">15 reps — squeeze glutes at top, hold 1 second</div>
                </div>
                <div className="cardio-ex">
                  <div className="cardio-ex-name">Side Plank</div>
                  <div className="cardio-ex-detail">20 sec each side — hips up, body straight. Rest 60 sec, then repeat circuit.</div>
                </div>
              </div>
            </div>

            <div className="phase-block">
              <div className="phase-title">Daily Steps — Your Secret Weapon</div>
              <div className="phase-item">
                <div className="phase-badge">10,000</div>
                <div className="phase-text">At your weight and activity level, 10k steps burns roughly <strong>350–500 extra calories per day</strong> — that's 2,500–3,500 extra per week. This alone is a massive advantage for fat loss without adding exercise stress.</div>
              </div>
              <div className="phase-item">
                <div className="phase-badge">KEEP IT</div>
                <div className="phase-text">Don't sacrifice your steps on training days. The walk is low-intensity enough to count as active recovery. Aim to keep your daily step count consistent even on rest days.</div>
              </div>
            </div>
          </div>
        )}

        {/* MOBILITY */}
        {tab === "mobility" && (
          <div>
            <div className="s-title">Mobility & Recovery</div>
            <div className="s-sub">Thursday · 40–50 min · Priority: scoliosis areas</div>

            <div className="alert">
              <div className="alert-title">Important — Scoliosis Guidance</div>
              <div className="alert-text">
                Work within a comfortable range of motion at all times. Never push into sharp pain or pinching. Gentle progressive stretching over weeks is the goal — not aggressive forcing. Thread the Needle and thoracic work may feel asymmetrical — this is normal. Consult a physio for tailored guidance if needed.
              </div>
            </div>

            {mobilityRoutine.map((section, i) => (
              <div className="mob-section" key={i}>
                <div className="mob-s-title">{section.category}</div>
                {section.exercises.map((ex, j) => (
                  <div className="mob-ex" key={j}>
                    <div className="mob-ex-name">{ex.name}</div>
                    <div className="mob-ex-detail">{ex.detail}</div>
                    {ex.note && <div className="mob-note">{ex.note}</div>}
                  </div>
                ))}
              </div>
            ))}

            <div className="phase-block">
              <div className="phase-title">Mini Mobility — Do Every Morning (5 min)</div>
              <div className="phase-item">
                <div className="phase-badge">DAILY</div>
                <div className="phase-text">Cat-cow × 10 → Chin tucks × 10 → Hip circles × 8 each side → 5 deep breaths. Takes 5 minutes. Dramatically improves how your body feels throughout the day.</div>
              </div>
            </div>
          </div>
        )}

        {/* NUTRITION */}
        {tab === "nutrition" && (
          <div>
            <div className="s-title">Nutrition Guide</div>
            <div className="s-sub">Simple. Sustainable. High-protein.</div>

            <div className="macro-grid">
              <div className="macro cal"><div className="macro-val">2,100</div><div className="macro-lbl">Calories</div></div>
              <div className="macro pro"><div className="macro-val">155g</div><div className="macro-lbl">Protein</div></div>
              <div className="macro fat"><div className="macro-val">65g</div><div className="macro-lbl">Fat</div></div>
              <div className="macro carb"><div className="macro-val">210g</div><div className="macro-lbl">Carbs</div></div>
            </div>

            <div className="n-card">
              <div className="n-title">Daily Meal Structure</div>
              <div className="meal-item">
                <div className="meal-time">Meal 1 — Breakfast (7–9am)</div>
                <div className="meal-content">Protein + healthy fat</div>
                <div className="meal-eg">3–4 eggs + vegetables + slice of whole grain bread. Or: Greek yogurt (plain, full fat) + oats + handful of nuts.</div>
              </div>
              <div className="meal-item">
                <div className="meal-time">Meal 2 — Lunch (12–1pm)</div>
                <div className="meal-content">Protein + carbs + vegetables</div>
                <div className="meal-eg">Chicken breast or tuna + rice or sweet potato + large salad or cooked veg. Generous portion.</div>
              </div>
              <div className="meal-item">
                <div className="meal-time">Snack — Pre or Post Workout</div>
                <div className="meal-content">Protein focus</div>
                <div className="meal-eg">Protein shake + banana. Or: cottage cheese + fruit. Or: handful of nuts + hard-boiled eggs.</div>
              </div>
              <div className="meal-item">
                <div className="meal-time">Meal 3 — Dinner (6–8pm)</div>
                <div className="meal-content">Protein + vegetables + small carb</div>
                <div className="meal-eg">Beef, fish, or chicken + roasted vegetables + small potato or legumes. Largest vegetable portion of the day.</div>
              </div>
            </div>

            <div className="n-card">
              <div className="n-title">The 6 Non-Negotiable Rules</div>
              <div className="rule-item">
                <div className="rule-n">1</div>
                <div className="rule-text"><span className="rule-bold">Hit your protein every day.</span> This protects muscle while you lose fat. Without enough protein, your body will break down muscle tissue. Aim for 150g minimum.</div>
              </div>
              <div className="rule-item">
                <div className="rule-n">2</div>
                <div className="rule-text"><span className="rule-bold">Don't drink your calories.</span> Water, black coffee, and tea only. Juice, soda, alcohol, and sugary drinks quietly destroy calorie targets.</div>
              </div>
              <div className="rule-item">
                <div className="rule-n">3</div>
                <div className="rule-text"><span className="rule-bold">Eat vegetables at every main meal.</span> Volume without many calories. Keeps you full, provides micronutrients, improves gut health.</div>
              </div>
              <div className="rule-item">
                <div className="rule-n">4</div>
                <div className="rule-text"><span className="rule-bold">Don't skip meals.</span> Skipping leads to extreme hunger, then overeating later. Three meals + one snack keeps appetite controlled.</div>
              </div>
              <div className="rule-item">
                <div className="rule-n">5</div>
                <div className="rule-text"><span className="rule-bold">80% whole foods.</span> Eat mostly real, unprocessed food. The 20% is your flexibility — one meal out, something you enjoy. Perfection isn't the goal.</div>
              </div>
              <div className="rule-item">
                <div className="rule-n">6</div>
                <div className="rule-text"><span className="rule-bold">Track for at least 2 weeks.</span> Use any free app (MyFitnessPal, Cronometer). You don't need to track forever — but tracking initially teaches you what portions actually look like.</div>
              </div>
            </div>

            <div className="phase-block">
              <div className="phase-title">Best High-Protein Foods to Prioritise</div>
              <div className="phase-item">
                <div className="phase-badge">MEAT</div>
                <div className="phase-text">Chicken breast, turkey, lean beef, eggs, canned tuna, canned sardines, salmon</div>
              </div>
              <div className="phase-item">
                <div className="phase-badge">DAIRY</div>
                <div className="phase-text">Greek yogurt (plain), cottage cheese, low-fat cheese, milk</div>
              </div>
              <div className="phase-item">
                <div className="phase-badge">PLANT</div>
                <div className="phase-text">Lentils, chickpeas, black beans, edamame, tofu — great for volume and fiber</div>
              </div>
              <div className="phase-item">
                <div className="phase-badge">SUPPLEMENT</div>
                <div className="phase-text">Whey or plant-based protein powder. Useful but not essential — use to hit protein targets if food alone falls short.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
