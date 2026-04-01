---
layout: post
title: Case Studies
description: Real examples of how we've helped businesses leverage data science, AI, and strategy consulting
nav-menu: true
show_tile: true
weight: 2
---

<style>
.case-studies {
  display: flex;
  gap: 2em;
}
.case-buttons {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  min-width: 280px;
}
.case-btn {
  background-color: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: inset 0 0 0 2px #fff;
  color: #fff;
  cursor: pointer;
  font-size: 0.65em;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 0.8em 1.2em;
  text-align: left;
  text-transform: uppercase;
  white-space: normal;
  line-height: 1.4;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
}
.case-btn:hover {
  box-shadow: inset 0 0 0 2px #9bf1ff;
  color: #9bf1ff;
}
.case-btn.active {
  background-color: rgba(155, 241, 255, 0.1);
  box-shadow: inset 0 0 0 2px #9bf1ff;
  color: #9bf1ff;
}
.case-detail {
  flex: 1;
  min-height: 200px;
}
.case-content {
  display: none;
}
.case-content.active {
  display: block;
}
.case-content h3 {
  margin-top: 0;
}
.case-content .impact {
  margin-top: 1em;
  font-weight: 600;
}

@media screen and (max-width: 768px) {
  .case-studies {
    flex-direction: column;
  }
  .case-buttons {
    min-width: 100%;
  }
}
</style>

<div class="case-studies">
  <div class="case-buttons">
    <button class="case-btn active" data-case="ai-tools">AI-Powered Internal Tools</button>
    <button class="case-btn" data-case="exec-review">Executive Performance Review & Anomaly Detection</button>
    <button class="case-btn" data-case="north-star">North Star Metric Strategy</button>
    <button class="case-btn" data-case="ltv">Customer Lifetime Value Investigation</button>
    <button class="case-btn" data-case="fraud">Fraud Signal Discovery & Data Integrity Overhaul</button>
    <button class="case-btn" data-case="macro">Macroeconomic Sensitivity Analysis</button>
    <button class="case-btn" data-case="chatbot">Measuring AI Chatbot Impact</button>
  </div>
  <div class="case-detail">

    <div class="case-content active" id="ai-tools">
      <h3>AI-Powered Internal Tools for Small Businesses</h3>
      <p>We set up Anthropic's Claude as an internal tool for businesses, connecting it to their existing data, documentation, and other sources. This empowers employees to automate workflows well beyond basic chatbot use.</p>
      <p>A typical example is a data detective bot that produces visualisations and insights on demand, turning hours of manual analysis into a simple conversation.</p>
      <p class="impact">This has been delivered across multiple client engagements.</p>
    </div>

    <div class="case-content" id="exec-review">
      <h3>Executive Performance Review & Anomaly Detection System</h3>
      <p>Designed and delivered a recurring executive-level performance review for a client's platform, incorporating all funnel metrics. Built an AI-powered anomaly detection system that not only flags anomalies but automatically explains their likely causes.</p>
      <p>This replaced static dashboards with a self-driven, exception-based approach: surfacing the biggest surprises in metric changes before leadership was aware of them.</p>
      <p class="impact">Impact: Empowered decision-makers to act on metric changes quickly. Reduced time-to-react on metric anomalies by days to weeks.</p>
    </div>

    <div class="case-content" id="north-star">
      <h3>North Star Metric Strategy</h3>
      <p>Led the development of a client's 2026 growth north star metric, replacing their existing metric with one that was more measurable, more relevant to the business, and less prone to noise.</p>
      <p class="impact">Impact: Gave the company a clearer, more actionable measure of growth to align their teams around.</p>
    </div>

    <div class="case-content" id="ltv">
      <h3>Customer Lifetime Value Prediction Collapse Investigation</h3>
      <p>Investigated a sudden and alarming drop in customer lifetime value predictions that was top-of-mind for the senior leadership team. Traced the root cause to a hidden segment concentration issue, then produced a series of follow-up analyses and a summary document for leadership.</p>
      <p class="impact">Impact: Resolved a metrics crisis that had been blocking executive decision-making for weeks. Restored confidence in the forecasting pipeline and surfaced a concentration risk affecting ~20% of projected revenue.</p>
    </div>

    <div class="case-content" id="fraud">
      <h3>Fraud Signal Discovery & Data Integrity Overhaul</h3>
      <p>Uncovered a long-standing fraud data issue that had been distorting a client's understanding of their own performance. Ramped up to full fluency on the company's fraud systems in just two days through rapid interviews with senior engineers and management, then produced example models and documentation to serve as the basis for new fraud systems.</p>
      <p class="impact">Impact: Resolved a systemic data integrity issue that had been distorting key business metrics for over a year, leading to more accurate reporting across the entire funnel.</p>
    </div>

    <div class="case-content" id="macro">
      <h3>Macroeconomic Sensitivity Analysis</h3>
      <p>Led a highly cross-departmental initiative to model and communicate the impact of macroeconomic softening on the business. Built a dedicated reporting tool that synthesised signals from across the organisation into a single view for leadership.</p>
      <p class="impact">Impact: Gave the executive team a clear, data-driven picture of their exposure to macroeconomic shifts, enabling proactive planning.</p>
    </div>

    <div class="case-content" id="chatbot">
      <h3>Measuring AI Chatbot Impact</h3>
      <p>A client had recently implemented an AI chatbot and needed robust measurement to determine whether it was helping or hindering their business. After implementing a measurement system over a few weeks, we found the chatbot was actually hurting performance due to poor responses and insufficient training data.</p>
      <p class="impact">Impact: Identified the problem and guided subsequent improvements. Customer satisfaction scores have since increased by an average of 10%.</p>
    </div>

  </div>
</div>

<script>
document.querySelectorAll('.case-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.case-btn').forEach(function(b) { b.classList.remove('active'); });
    document.querySelectorAll('.case-content').forEach(function(c) { c.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById(btn.getAttribute('data-case')).classList.add('active');
  });
});
</script>
