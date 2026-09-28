import type { Project } from "../types";
import cover from "./cover.webp";
import recDashboard from "./rec-dashboard.webp";
import recInterviews from "./rec-interviews.webp";
import recInterviewCreate from "./rec-interview-create.webp";
import recInviteIndividual from "./rec-invite-individual.webp";
import recInviteStatus from "./rec-invite-status.webp";
import recInterviewStatus from "./rec-interview-status.webp";
import recInterviewQuestion from "./rec-interview-question.webp";
import recResponseDetail from "./rec-response-detail.webp";
import recResponseQuiz from "./rec-response-quiz.webp";
import recResponses from "./rec-responses.webp";
import recTemplateCreate from "./rec-template-create.webp";
import recSettingsBranding from "./rec-settings-branding.webp";
import recSettingsIntro from "./rec-settings-intro.webp";
import applyHome from "./apply-home.webp";
import applyWelcome from "./apply-welcome.webp";
import applyCheck from "./apply-check.webp";
import applyRecordStart from "./apply-record-start.webp";
import applyRecordVideo from "./apply-record-video.webp";
import applyRecordMulti from "./apply-record-multi.webp";
import applyDone from "./apply-done.webp";
import candDashboard from "./cand-dashboard.webp";
import candQuestions from "./cand-questions.webp";
import candQuestionCreate from "./cand-question-create.webp";
import candPracticeTeleprompter from "./cand-practice-teleprompter.webp";
import candPracticeRecording from "./cand-practice-recording.webp";
import candPractices from "./cand-practices.webp";
import candPracticeReviews from "./cand-practice-reviews.webp";
import candShareDialog from "./cand-share-dialog.webp";
import candShareDetail from "./cand-share-detail.webp";
import candSelfReview from "./cand-self-review.webp";
import candProfile from "./cand-profile.webp";
import candNetwork from "./cand-network.webp";
import candNetworkContacts from "./cand-network-contacts.webp";
import candMarketplace from "./cand-marketplace.webp";
import candDarkMode from "./cand-dark-mode.webp";
import authSignup from "./auth-signup.webp";

const project: Project = {
  slug: "skillsynk",
  title: "SkillSynk | Async Video Interview Platform",
  description:
    "A video interview platform where candidates practise with scored feedback and recruiters screen applicants through recorded one-way interviews.",
  longDescription:
    "SkillSynk helped job seekers get better at interviews and helped companies screen them faster. Candidates practised answering questions on camera with a built-in teleprompter, then shared their recordings with peers and coaches, who scored them on twelve verbal and non-verbal criteria and left notes. Recruiters built one-way video interviews from question templates, mixing video answers with single- and multiple-choice questions, invited applicants one by one, in bulk or through a link, and reviewed the answers as a team with ratings and comments. Applicants took the interview in a separate, company-branded app that checked their camera and microphone before they recorded. I built the React front ends for candidates, recruiters and applicants with Material-UI, and worked with a teammate on the Express and MongoDB API, which ran on AWS Lambda with recordings uploaded straight to S3. The screenshots show the app running locally with made-up data; the people in the interview videos are illustrated avatars.",
  type: "Project I worked on",
  role: "Full Stack Developer",
  duration: "Jun 2021 - Dec 2021",
  icon: "video",
  gradient: "from-blue-500 to-violet-500",
  tags: [
    "Video Interviews",
    "HR Tech",
    "React",
    "Node.js",
    "MongoDB",
  ],
  technologies: [
    "JavaScript",
    "React",
    "Material-UI",
    "React Router",
    "MediaRecorder API",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "AWS Lambda",
    "Serverless Framework",
    "AWS S3",
    "SendGrid",
    "Google OAuth",
    "Next.js",
  ],
  features: [
    "One-way video interviews built from question templates, mixing video, single-choice and multiple-choice questions with time limits and drag-and-drop ordering",
    "Invites sent individually with email templates and expiry dates, in bulk from past candidates, or through a shareable link, tracked in a status table",
    "Team review of applicants: a gallery of answers for each question, video playback, star ratings, comments and automatically marked quiz answers",
    "A separate, company-branded apply app with consent, a camera, microphone and network check, and timed recording of each answer",
    "A practice studio with a tagged question bank, webcam recording with a countdown and retakes, and a scrolling teleprompter with speed and font controls",
    "Peer and coach reviews that score answers on twelve verbal and non-verbal criteria, averaged into a score matrix, plus self-reviews",
    "Sharing practice sessions and full interviews with connections or by email, including public review links",
    "Profiles with image cropping, a professional network with connection requests and contact import from Google or CSV, and a marketplace of reviewers and coaches",
    "Company branding (logo, colours, background, legal links) and an intro video shown to applicants",
    "Google sign-in, email through SendGrid, in-app notifications and a dark mode",
  ],
  links: {},
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "A coach's review of a practice answer: twelve criteria scored from 1 to 5, a note, and the answer video." },
    { image: recDashboard, caption: "Recruiter dashboard: interviews, invites and responses, with the latest video answers." },
    { image: recInterviews, caption: "The recruiter's interviews." },
    { image: recInterviewCreate, caption: "Creating an interview from question templates." },
    { image: recInviteIndividual, caption: "Inviting applicants with a personalised email template." },
    { image: recInviteStatus, caption: "Invite status: completed, sent, expired and open." },
    { image: recInterviewStatus, caption: "An interview's invites, responses and candidates." },
    { image: recInterviewQuestion, caption: "Every applicant's answer to one question, side by side." },
    { image: recResponseDetail, caption: "Reviewing a video answer with the team's ratings and comments." },
    { image: recResponseQuiz, caption: "A multiple-choice answer, marked right or wrong automatically." },
    { image: recResponses, caption: "Responses grouped by applicant." },
    { image: recTemplateCreate, caption: "Creating an email template for invites." },
    { image: recSettingsBranding, caption: "Company branding for the apply app: colour, background and legal links." },
    { image: recSettingsIntro, caption: "The company intro video applicants see before they start." },
    { image: applyHome, caption: "The apply app: applicants enter their invite ID." },
    { image: applyWelcome, caption: "A company-branded welcome page with the intro video and consent." },
    { image: applyCheck, caption: "Camera, microphone and network check before recording." },
    { image: applyRecordStart, caption: "The interview's questions, with a time limit for each." },
    { image: applyRecordVideo, caption: "Recording a video answer." },
    { image: applyRecordMulti, caption: "A multiple-choice question in the interview." },
    { image: applyDone, caption: "The confirmation once an application is submitted." },
    { image: candDashboard, caption: "Candidate dashboard: interview requests and feedback on practice answers." },
    { image: candQuestions, caption: "The question bank, with tags, favourites and teleprompter scripts." },
    { image: candQuestionCreate, caption: "Adding a custom practice question." },
    { image: candPracticeTeleprompter, caption: "The teleprompter over the live camera before a practice take." },
    { image: candPracticeRecording, caption: "Recording a practice answer." },
    { image: candPractices, caption: "The practice video library." },
    { image: candPracticeReviews, caption: "Scores from every reviewer, averaged into an overall column." },
    { image: candShareDialog, caption: "Sharing a practice with connections or by email for review." },
    { image: candShareDetail, caption: "A shared interview with a reviewer's scores." },
    { image: candSelfReview, caption: "Reviewing your own answer." },
    { image: candProfile, caption: "A candidate profile." },
    { image: candNetwork, caption: "The candidate's network of connections." },
    { image: candNetworkContacts, caption: "Importing contacts from email providers or a CSV file." },
    { image: candMarketplace, caption: "The marketplace of reviewers and interview coaches." },
    { image: candDarkMode, caption: "The review matrix in dark mode." },
    { image: authSignup, caption: "Signing up as an individual or a business." },
  ],
};

export default project;
