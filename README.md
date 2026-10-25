# Maths 90 Days — Class 8

A free 90-day maths practice plan for Class 8 (NCERT syllabus), from the very basics to expert level.

- **One lesson + two 10-question tests per day** (both must score 6/10 to unlock the next day), with a review of both tests for each date. Every lesson has key points, a worked example and links to YouTube, Khan Academy, the NCERT textbook and more examples online.
- **Fresh questions every attempt.** Questions are generated randomly, so students can retake a test as many times as they like.
- **Step-by-step explanations** after each test.
- **Progress tracking** (best score, streak, level) saved in the browser. Each day unlocks after scoring 6/10 on the day before; teachers can unlock all days in Settings.

| Phase | Days | Level |
|---|---|---|
| Foundations | 1–20 | Beginner |
| Number System | 21–35 | Intermediate |
| Algebra | 36–50 | Intermediate → Advanced |
| Commercial Maths | 51–60 | Advanced |
| Geometry & Mensuration | 61–78 | Advanced → Expert |
| Expert Challenges | 79–90 | Expert |

It is a plain static site (HTML/CSS/JS, no build step). To run locally, open `index.html` or run `python3 -m http.server`.

## Student accounts & admin dashboard
With a free Firebase project connected (see [SETUP.md](SETUP.md)):
- Students register with their name, school, class/section, roll number, parent phone and city, then log in.
- Every test attempt is stored, including each question, the student's answer and the correct answer.
- `admin.html` lets teachers view all students, filter and sort them, and see progress heat-maps, topic analysis, recent tests and a per-date review of both daily tests. Data can be exported as CSV.
