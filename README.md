Вот исправленный и правильно оформленный **полный `.md` файл** для `README.md`:

````md
## 🚀 How to Run the Project with Next.js and AWS Amplify Gen2

Hi there! Here's a quick guide to running the project locally with a Next.js frontend and AWS Amplify Gen2 backend.

---

### 🔧 Prerequisites

1. **AWS Account**  
   Sign up: [https://aws.amazon.com](https://aws.amazon.com)

2. **AWS CLI**  
   Install: [https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)  
   Configure access:
   ```bash
   aws configure
   ```
````

You'll need:

- **Access Key ID**
- **Secret Access Key**
- **Region** (e.g., `eu-central-1`)
  Use an **Admin-level IAM user** for full access.

3. **Node.js 22**
   Recommended installation using `nvm`:

   ```bash
   nvm install 22
   nvm use 22
   ```

4. **Amplify CLI Gen2**
   Install globally:

   ```bash
   npm install -g @aws-amplify/backend-cli
   ```

---

### 📦 Build & Run the Project

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start Amplify Sandbox (local environment)**:

   ```bash
   npm run sandbox
   ```

3. **Or (Optional) with function logs**:

   ```bash
   npm run sandbox:log
   ```

4. **Start the frontend**:

   ```bash
   npm run dev
   ```

   The app will be available at: [http://localhost:3000](http://localhost:3000)

---
