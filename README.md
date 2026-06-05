# PostCraft — AI-Powered Social Media Manager

PostCraft is an AI-native social media management platform built to help creators and businesses generate, preview, and publish highly engaging posts for LinkedIn, Twitter, and Facebook. It uses Google's Gemini models to generate content while adhering to strict brand guardrails, and uses background job queues for seamless, non-blocking generation.

## 🚀 Key Features

### 🤖 AI Variant Generation & Scoring
- **Multi-Variant Generation**: Generates multiple distinct post variants based on a simple topic prompt.
- **Engagement Scoring**: Automatically scores and ranks variants for clarity, readability, and engagement potential.
- **Context-Aware Formatting**: Tailors hooks, bodies, and CTAs precisely for each targeted platform.

### 🛡️ Brand Guardrails & Personas
- **Dynamic Guardrails**: Enforce mandatory rules, block banned words, and strictly control the formatting of generated content.
- **Audience & Tone Personas**: Select specific target audiences (e.g., Founders, Engineers) and preferred tones (e.g., Thought Leader, Storyteller).

### 📱 High-Fidelity Social Previews
- **Pixel-Perfect Rendering**: Preview exactly how your content will look natively on LinkedIn, Twitter, and Facebook (including character limits, hashtag formatting, and "See more" text cutoffs).
- **Platform-Specific Validation**: Warns you if you exceed platform character limits (e.g., 280 for Twitter) before posting.

### ⚡ Seamless Publishing & Scheduling
- **Direct Integration**: Connect your Twitter, LinkedIn, and Facebook accounts securely.
- **Post Now or Later**: Dispatch posts immediately or schedule them to be published automatically at a specific time without interacting with the platforms directly.

### ⚙️ Background Processing & Reliability
- **Inngest Integration**: Heavy AI workloads and background posting tasks are pushed to Inngest queues, ensuring the UI remains snappy.
- **Graceful Rate Limiting**: Intelligent alerts dynamically notify you when AI models are overloaded or when you hit daily quota limits.
- **Topic Suggestions**: Tracks global trending topics to help combat writer's block.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui & Radix UI
- **State Management**: Redux Toolkit (RTK)
- **AI Models**: Google Gemini API
- **Background Jobs**: Inngest
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Better Auth

## 📦 Getting Started

### Prerequisites
- Node.js 18+ (or `pnpm` latest)
- MongoDB instance
- API Keys: Google Gemini, Inngest, Better Auth credentials, and Social Platform OAuth credentials.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/montasim/linkedIQ.git
   cd linkedIQ
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root and fill in your keys.

4. **Seed the Database:**
   ```bash
   pnpm seed
   ```

5. **Start the Development Servers:**
   This command starts both the Next.js app and the local Inngest Dev Server.
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure Highlights

- `app/`: Next.js App Router endpoints, API routes, and main page shells.
- `components/features/`: Domain-specific components (e.g., `generate`, `preview`, `settings`, `library`).
- `components/shared/`: Reusable UI elements, alerts, and inputs.
- `modules/`: Backend business logic, separated by domain (e.g., `generation`, `insights`, `workspace`).
- `store/`: Redux slices and store configuration for global UI state.
- `inngest/`: Background job definitions and handlers for AI generations and scheduled posts.

## 📄 License
MIT
