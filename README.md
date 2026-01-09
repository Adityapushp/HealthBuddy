# HealthBuddy

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

HealthBuddy is a modern, responsive web application designed to help users track their medications and doctor's appointments with ease. It features a clean, intuitive interface and leverages AI to provide users with a summarized health overview.

## Live Demo

**You can view a live demo of the application here: [(https://studio--studio-7351490864-5f353.us-central1.hosted.app)]**

## Features

*   **User Authentication:** Secure sign-up and sign-in functionality using Firebase Authentication.
*   **Dashboard:** A central hub to view your health information at a glance.
*   **Medication Tracking:** Add and manage your current medications, including dosage and frequency.
*   **Appointment Scheduling:** Keep track of your upcoming doctor's appointments.
*   **AI Health Summary:** Generate a concise summary of your health data, perfect for sharing with your doctor.
*   **Responsive Design:** Fully functional on both desktop and mobile devices.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Backend & Database:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)
*   **Generative AI:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or newer)
*   npm or yarn

### Installation

1.  **Clone the repository** (or download the source code):
    ```sh
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```
2.  **Install NPM packages**:
    ```sh
    npm install
    ```
3.  **Set up Firebase**:
    *   Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    *   Add a new Web App to your project.
    *   Copy the Firebase configuration object and place it in `src/firebase/config.ts`.
    *   Enable **Email/Password** authentication in the Firebase Console under `Authentication > Sign-in method`.
    *   Set up **Firestore** and update your security rules using the contents of `firestore.rules`.

4.  **Run the development server**:
    ```sh
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
