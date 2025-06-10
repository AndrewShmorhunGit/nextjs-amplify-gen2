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

### 🏗️ Bootstrap CDK (One-time Setup)

Before running the project, you need to **bootstrap the AWS CDK environment**. This step provisions backend infrastructure (like S3 buckets and roles) required by Amplify Gen2.

Run the following command **once per AWS account/region**:

```bash
cdk bootstrap
```

> ✅ This uses your default AWS profile and region.  
> If you use a named profile or specific region, run:

```bash
cdk bootstrap aws://<ACCOUNT_ID>/<REGION> --profile <PROFILE_NAME>
```

To find your account and region:

```bash
aws sts get-caller-identity
aws configure get region
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
