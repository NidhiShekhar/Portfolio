// Research details data
const researchDetails = [
    {
        id: "research-card-1",
        title: "Comparative Analysis of Machine Learning Algorithms for Binary Classification of Tea Leaf Diseases",
        details: `
      <p>This research compares various machine learning algorithms for detecting tea leaf diseases using image processing and advanced ML techniques like autoencoders, LightGBM, CatBoost, and self-organizable maps.</p>
      <ul>
        <li>Tools: Python, TensorFlow, Keras, Scikit-learn, Matplotlib, Roboflow</li>
        <li>Published in ICAECT 2025</li>
      </ul>
    `,
        link: "https://ieeexplore.ieee.org/document/10958988"
    },
    {
        id: "research-card-2",
        title: "Quantifying Modality Contributions by Disentangling Multimodal Representations",
        details: `
        <div class="research-modal-header">
        <a href="https://arxiv.org/pdf/2511.19470" class="paper-button" target="_blank" style="margin-bottom:1em;">Read Research Paper 📄</a>
      </div>
    <div class="research-modal-content">
      
      <div class="research-modal-abstract">
        <h3>Abstract</h3>
        <p>
          Quantifying modality contributions in multimodal models remains a challenge, as existing approaches conflate the notion of contribution itself. Prior work relies on accuracy-based approaches, interpreting performance drops after removing a modality as indicative of its influence. However, such outcome-driven metrics fail to distinguish whether a modality is inherently informative or whether its value arises only through interaction with other modalities. This distinction is particularly important in cross-attention architectures, where modalities influence each other’s representations.
        </p>
        <p>
          In this work, we propose a framework based on Partial Information Decomposition (PID) that quantifies modality contributions by decomposing predictive information in internal embeddings into unique, redundant, and synergistic components. To enable scalable, inference-only analysis, we develop an algorithm based on the Iterative Proportional Fitting Procedure (IPFP) that computes layer and dataset-level contributions without retraining. This provides a principled, representation-level view of multimodal behavior, offering clearer and more interpretable insights than outcome-based metrics.
        </p>
      </div>
      <div class="research-modal-figure">
        <img src="rsc/formula.png" alt="PID Decomposition Diagram" style="max-width:60%;margin:1em 0;">
        <p class="figure-caption"><b>Figure 1:</b> Overview of the proposed modality contribution framework, where text contribution (C<sub>T</sub>) and image contribution (C<sub>I</sub> = 100 − C<sub>T</sub>) together form a normalized 100% distribution on the BLIP model.</p>
      </div>
      <div class="research-modal-figure">
        <img src="rsc/intro_table.png" alt="Modality Contribution Examples" style="max-width:45%;margin:1em 0;">
        <p class="figure-caption"><b>Figure 2:</b> Example inputs and their respective modality contributions and model outputs.</p>
      </div>
      <div class="research-modal-summary">
        <h4>Key Points</h4>
        <ul>
          <li>Proposes a PID-based framework for quantifying unique, redundant, and synergistic modality contributions.</li>
          <li>Enables scalable, inference-only analysis without retraining models.</li>
          <li>Provides interpretable, representation-level insights into multimodal model behavior.</li>
        </ul>
      </div>
    </div>
  `,
        link: "http://arxiv.org/abs/2511.19470"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    // Get modal elements
    const researchModal = document.getElementById('research-modal');
    const modalTitle = document.getElementById('research-modal-title');
    const modalDetails = document.getElementById('research-modal-details');
    const modalLink = document.getElementById('research-modal-link');
    const closeModalBtn = researchModal.querySelector('.close-modal');

    // Attach click listeners to research paper buttons
    document.querySelectorAll('#research .paper-button').forEach((btn, idx) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const cardId = btn.closest('.research-card').id;
            const data = researchDetails.find(r => r.id === cardId);
            if (data) {
                modalTitle.textContent = data.title;
                modalDetails.innerHTML = data.details;
                modalLink.href = data.link;
                researchModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal on button click
    closeModalBtn.addEventListener('click', function () {
        researchModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Optional: Close modal when clicking outside modal content
    researchModal.addEventListener('click', function (e) {
        if (e.target === researchModal) {
            researchModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});