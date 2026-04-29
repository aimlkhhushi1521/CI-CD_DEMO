const http = require('http');
const fs = require('fs');
const path = require('path');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CI/CD DevOps - Modern Deployment</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      min-height: 100vh;
      color: #e2e8f0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #334155;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #22d3ee;
    }

    .logo span { color: #f472b6; }

    nav a {
      color: #94a3b8;
      text-decoration: none;
      margin-left: 30px;
      transition: color 0.3s;
    }

    nav a:hover { color: #22d3ee; }

    .hero {
      text-align: center;
      padding: 100px 0;
    }

    .hero h1 {
      font-size: 3.5rem;
      margin-bottom: 20px;
      background: linear-gradient(90deg, #22d3ee, #f472b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero p {
      font-size: 1.25rem;
      color: #94a3b8;
      max-width: 600px;
      margin: 0 auto 40px;
    }

    .btn {
      display: inline-block;
      padding: 15px 40px;
      background: linear-gradient(90deg, #22d3ee, #06b6d4);
      color: #0f172a;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(34, 211, 238, 0.3);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      padding: 60px 0;
    }

    .card {
      background: #1e293b;
      padding: 30px;
      border-radius: 12px;
      border: 1px solid #334155;
      transition: transform 0.3s, border-color 0.3s;
    }

    .card:hover {
      transform: translateY(-5px);
      border-color: #22d3ee;
    }

    .card h3 {
      color: #22d3ee;
      margin-bottom: 15px;
      font-size: 1.3rem;
    }

    .card p { color: #94a3b8; line-height: 1.6; }

    .icon { font-size: 2rem; margin-bottom: 15px; }

    .pipeline {
      background: #1e293b;
      padding: 40px;
      border-radius: 12px;
      margin: 40px 0;
    }

    .pipeline h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #f472b6;
    }

    .steps {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
    }

    .step {
      flex: 1;
      min-width: 150px;
      text-align: center;
      padding: 20px;
      background: #0f172a;
      border-radius: 8px;
      position: relative;
    }

    .step::after {
      content: '→';
      position: absolute;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      color: #22d3ee;
      font-size: 1.5rem;
    }

    .step:last-child::after { display: none; }

    .step-number {
      width: 40px;
      height: 40px;
      background: linear-gradient(90deg, #22d3ee, #f472b6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      font-weight: bold;
      color: #0f172a;
    }

    footer {
      text-align: center;
      padding: 40px 0;
      border-top: 1px solid #334155;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">CI/CD <span>DevOps</span></div>
      <nav>
        <a href="#features">Features</a>
        <a href="#pipeline">Pipeline</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <section class="hero">
      <h1>🚀 Modern DevOps Pipeline</h1>
      <p>Streamline your software delivery with continuous integration and continuous deployment. Build, test, and deploy with confidence.</p>
      <a href="#features" class="btn">Get Started</a>
    </section>

    <section class="features" id="features">
      <div class="card">
        <div class="icon">🔄</div>
        <h3>Continuous Integration</h3>
        <p>Automatically build and test your code on every commit. Catch bugs early and ensure code quality.</p>
      </div>
      <div class="card">
        <div class="icon">📦</div>
        <h3>Continuous Delivery</h3>
        <p>Automatically deploy your code to staging and production environments with zero downtime.</p>
      </div>
      <div class="card">
        <div class="icon">🐳</div>
        <h3>Container Orchestration</h3>
        <p>Seamlessly manage containers with Docker and Kubernetes for scalable deployments.</p>
      </div>
      <div class="card">
        <div class="icon">📊</div>
        <h3>Monitoring & Logging</h3>
        <p>Real-time insights into your pipeline health with comprehensive logging and metrics.</p>
      </div>
      <div class="card">
        <div class="icon">🔒</div>
        <h3>Security Scanning</h3>
        <p>Automated security vulnerability scanning to keep your applications secure.</p>
      </div>
      <div class="card">
        <div class="icon">⚡</div>
        <h3>Fast Deployments</h3>
        <p>Reduce deployment time from hours to minutes with automated pipelines.</p>
      </div>
    </section>

    <section class="pipeline" id="pipeline">
      <h2>📋 CI/CD Pipeline Flow</h2>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <h4>Code Commit</h4>
          <p>Push to Git</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h4>Build</h4>
          <p>Compile Code</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h4>Test</h4>
          <p>Run Tests</p>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <h4>Scan</h4>
          <p>Security Check</p>
        </div>
        <div class="step">
          <div class="step-number">5</div>
          <h4>Deploy</h4>
          <p>To Production</p>
        </div>
      </div>
    </section>

    <footer>
      <p>© 2026 CI/CD DevOps Pipeline. Built with 🚀 and Docker.</p>
    </footer>
  </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("Updated CI/CD pipeline working 🚀");
  
  res.write(htmlContent);
  res.end();
});

server.listen(3000, () => {
  console.log('🚀 DevOps Intro Site running at http://localhost:3000');
});
