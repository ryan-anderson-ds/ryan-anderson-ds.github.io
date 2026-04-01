---
layout: post
title: What We Do
description: Learn more about Vancouver Data Science Consulting
nav-menu: true
show_tile: true
weight: 1
---

<style>
.specialise-row {
  display: flex;
  gap: 2em;
  align-items: flex-start;
}
.specialise-venn {
  flex: 0 0 auto;
  width: 280px;
}
.specialise-text {
  flex: 1;
}
@media screen and (max-width: 768px) {
  .specialise-row {
    flex-direction: column;
  }
  .specialise-venn {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }
}
</style>

## Areas we specialise in

<div class="specialise-row">
  <div class="specialise-venn">
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="100" r="90" fill="none" stroke="#64dfdf" stroke-width="2"/>
      <circle cx="100" cy="200" r="90" fill="none" stroke="#64dfdf" stroke-width="2"/>
      <circle cx="200" cy="200" r="90" fill="none" stroke="#64dfdf" stroke-width="2"/>
      <!-- Intersection fill -->
      <clipPath id="clip-strategy"><circle cx="100" cy="200" r="90"/></clipPath>
      <clipPath id="clip-data"><circle cx="200" cy="200" r="90"/></clipPath>
      <g clip-path="url(#clip-strategy)">
        <g clip-path="url(#clip-data)">
          <circle cx="150" cy="100" r="90" fill="rgba(100, 223, 223, 0.25)"/>
        </g>
      </g>
      <!-- Labels -->
      <text x="150" y="80" fill="#fff" font-size="24" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">AI</text>
      <text x="72" y="215" fill="#fff" font-size="24" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Strategy</text>
      <text x="228" y="215" fill="#fff" font-size="24" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Data</text>
    </svg>
  </div>
  <div class="specialise-text">
    <ul>
      <li><strong>Deep dive investigations:</strong> We specialise in analytical deep dives into your existing business data, answering specific strategy, product or AI questions you may have. While we can do implementations too, follow-up implementations can vary in form, technologies used, and duration, so it depends on the situation and the technologies you already use. See "long term implementations or partnerships" below.</li>
      <li><strong>Product:</strong> Measuring the effectiveness of your current product based on existing data patterns, or designing and implementing a solution to do so.</li>
      <li><strong>Business strategy:</strong> We excel at forming the connection between your data, your business, and your future business strategy.</li>
      <li><strong>AI:</strong> AI implementation for data decision making has been the majority of our work recently. We specialise in setting up AI tools so that you, a small or medium business, can cheaply leverage the latest technology to power up your business.</li>
    </ul>
  </div>
</div>

## Small to medium sized businesses have the most to gain

While a lot of our experience is with large tech companies, we find that small to medium businesses stand to gain the most from their data and AI, especially if:
- They do not yet have data strategies
- They have been collecting a lot of data, but not using it extensively yet

## The Vancouver Data Science Consulting Way

We approach your business strategy and data needs as a holistic system: an interconnected stack of systems that can be fine tuned to produce empowering insights.

<style>
.stack-diagram {
  width: 100%;
  max-width: 800px;
  margin: 2em auto;
}
.stack-diagram svg {
  width: 100%;
  height: auto;
}
.stack-diagram .node rect,
.stack-diagram .node ellipse {
  transition: fill 0.2s, stroke-width 0.2s;
}
.stack-diagram .node:hover rect,
.stack-diagram .node:hover ellipse {
  fill: #1e3a4f;
  stroke-width: 3;
}
</style>

<div class="stack-diagram">
<svg viewBox="0 0 820 700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#64dfdf"/>
    </marker>
  </defs>

  <!-- Product node (top) -->
  <g class="node">
    <ellipse cx="400" cy="40" rx="80" ry="28" fill="#2c3e50" stroke="#64dfdf" stroke-width="2"/>
    <text x="400" y="45" fill="#fff" font-size="14" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Product</text>
  </g>

  <!-- Arrow: Product -> Data Collection -->
  <line x1="400" y1="68" x2="400" y2="98" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- Data Collection -->
  <g class="node">
    <rect x="150" y="105" width="500" height="80" rx="6" fill="#2c3e50" stroke="#64dfdf" stroke-width="2"/>
    <text x="400" y="130" fill="#fff" font-size="14" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Data Collection</text>
    <text x="400" y="152" fill="rgba(220,235,245,0.7)" font-size="11" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Are you collecting all of the data available to you? Are you hindered</text>
    <text x="400" y="168" fill="rgba(220,235,245,0.7)" font-size="11" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">by processes such as GDPR, or slow and inaccurate measurements?</text>
  </g>

  <!-- Arrow -->
  <line x1="400" y1="185" x2="400" y2="215" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- Data Storage -->
  <g class="node">
    <rect x="150" y="222" width="500" height="80" rx="6" fill="#2c3e50" stroke="#64dfdf" stroke-width="2"/>
    <text x="400" y="247" fill="#fff" font-size="14" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Data Storage</text>
    <text x="400" y="269" fill="rgba(220,235,245,0.7)" font-size="11" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Are you storing data correctly, in raw form, allowing you to iterate on</text>
    <text x="400" y="285" fill="rgba(220,235,245,0.7)" font-size="11" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">data models as your understanding of your business changes?</text>
  </g>

  <!-- Arrow -->
  <line x1="400" y1="302" x2="400" y2="332" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- Data Models -->
  <g class="node">
    <rect x="150" y="339" width="500" height="80" rx="6" fill="#2c3e50" stroke="#64dfdf" stroke-width="2"/>
    <text x="400" y="364" fill="#fff" font-size="14" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Data Models</text>
    <text x="400" y="386" fill="rgba(220,235,245,0.7)" font-size="11" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Are you transforming data into fast, informative models that combine</text>
    <text x="400" y="402" fill="rgba(220,235,245,0.7)" font-size="11" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">data in meaningful ways to the business?</text>
  </g>

  <!-- Arrows: Data Models -> three nodes -->
  <line x1="220" y1="419" x2="170" y2="458" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="400" y1="419" x2="400" y2="458" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="580" y1="419" x2="630" y2="458" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- Reporting -->
  <g class="node">
    <rect x="70" y="465" width="230" height="80" rx="6" fill="#2c3e50" stroke="#64dfdf" stroke-width="2"/>
    <text x="185" y="490" fill="#fff" font-size="13" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Reporting</text>
    <text x="185" y="510" fill="rgba(220,235,245,0.7)" font-size="10" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Are you producing accurate, insightful,</text>
    <text x="185" y="524" fill="rgba(220,235,245,0.7)" font-size="10" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">causal, noise-free reports?</text>
  </g>

  <!-- AI Tooling -->
  <g class="node">
    <rect x="310" y="465" width="180" height="80" rx="6" fill="#2c3e50" stroke="#64dfdf" stroke-width="2"/>
    <text x="400" y="490" fill="#fff" font-size="13" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">AI Tooling</text>
    <text x="400" y="510" fill="rgba(220,235,245,0.7)" font-size="10" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Are you implementing decision-</text>
    <text x="400" y="524" fill="rgba(220,235,245,0.7)" font-size="10" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">empowering AI that leverages your data?</text>
  </g>

  <!-- Other Automation -->
  <g class="node">
    <rect x="500" y="465" width="230" height="80" rx="6" fill="#2c3e50" stroke="#64dfdf" stroke-width="2"/>
    <text x="615" y="490" fill="#fff" font-size="13" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Other Automation</text>
    <text x="615" y="510" fill="rgba(220,235,245,0.7)" font-size="10" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Are you using ML or LLMs to form a</text>
    <text x="615" y="524" fill="rgba(220,235,245,0.7)" font-size="10" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">feedback loop into your product?</text>
  </g>

  <!-- Arrows: three nodes -> Decision Making -->
  <line x1="185" y1="545" x2="290" y2="588" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="400" y1="545" x2="400" y2="588" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="615" y1="545" x2="510" y2="588" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- Decision Making -->
  <g class="node">
    <rect x="200" y="595" width="400" height="80" rx="6" fill="#2c3e50" stroke="#64dfdf" stroke-width="2"/>
    <text x="400" y="620" fill="#fff" font-size="14" font-weight="600" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Decision-Making</text>
    <text x="400" y="642" fill="rgba(220,235,245,0.7)" font-size="11" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">Is your decision-making process sound, concentrating on the</text>
    <text x="400" y="658" fill="rgba(220,235,245,0.7)" font-size="11" font-family="Source Sans Pro, Helvetica, sans-serif" text-anchor="middle">right data, relevant to your current business strategy?</text>
  </g>

  <!-- Arrow: Decision Making -> Product (loops back, left side) -->
  <path d="M 200,635 L 50,635 Q 20,635 20,605 L 20,65 Q 20,40 50,40 L 320,40" fill="none" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- Arrow: Other Automation -> Product (loops back, right side) -->
  <path d="M 730,505 L 780,505 Q 800,505 800,475 L 800,65 Q 800,40 775,40 L 480,40" fill="none" stroke="#64dfdf" stroke-width="2" marker-end="url(#arrowhead)"/>
</svg>
</div>

## Just Vancouver?

We prefer regularly meeting and working face to face. There is no substitute for in-person communication. We are very open to doing business with companies in other cities and time zones, but it will depend on the duration and intensity of the project.

## Long term implementations or partnerships

Implementations are possible, but depend on the situation and whether we are a good match for the technologies you may already be using. We have a wide variety of technological experience, but will be honest if we cannot match your implementation requirements with our existing skills.

Long term partnerships are also offered, should you need regular building and maintenance of your data systems, or regular deep dives into data.

## Frequently Asked Questions

**What services does Vancouver Data Science Consulting offer?**

We specialise in analytical deep dives into your existing business data, product effectiveness measurement, business strategy consulting, and AI implementation for small and medium businesses.

**Who do you typically work with?**

We work with small to medium sized businesses, particularly those that don't yet have data strategies or have been collecting data but aren't using it extensively yet.

**Do you only work with businesses in Vancouver?**

We prefer face-to-face meetings but are open to working with companies in other cities and time zones, depending on the duration and intensity of the project.

**Do you offer long term partnerships?**

Yes, we offer long term partnerships for regular building and maintenance of data systems, or regular deep dives into data.

**Can you handle implementations as well as investigations?**

Yes, though implementations depend on whether we are a good match for the technologies you already use. We have wide technological experience but will be honest if we can't match your requirements.

**Is there a cost to an initial consultation?**

No, we offer a free one hour initial session to discuss your business' needs, with zero obligations.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Vancouver Data Science Consulting offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We specialise in analytical deep dives into your existing business data, product effectiveness measurement, business strategy consulting, and AI implementation for small and medium businesses."
      }
    },
    {
      "@type": "Question",
      "name": "Who do you typically work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work with small to medium sized businesses, particularly those that don't yet have data strategies or have been collecting data but aren't using it extensively yet."
      }
    },
    {
      "@type": "Question",
      "name": "Do you only work with businesses in Vancouver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We prefer face-to-face meetings but are open to working with companies in other cities and time zones, depending on the duration and intensity of the project."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer long term partnerships?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer long term partnerships for regular building and maintenance of data systems, or regular deep dives into data."
      }
    },
    {
      "@type": "Question",
      "name": "Can you handle implementations as well as investigations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, though implementations depend on whether we are a good match for the technologies you already use. We have wide technological experience but will be honest if we can't match your requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a cost to an initial consultation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, we offer a free one hour initial session to discuss your business' needs, with zero obligations."
      }
    }
  ]
}
</script>
