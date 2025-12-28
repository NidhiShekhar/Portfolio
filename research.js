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
      <p>This work explores multimodal representation learning and quantifies the contribution of each modality by disentangling features.</p>
      <ul>
        <li>Tools: Deep Learning, Multimodal Data, Representation Learning</li>
        <li>Preprint on arXiv</li>
      </ul>
    `,
    link: "http://arxiv.org/abs/2511.19470"
  }
];

document.addEventListener('DOMContentLoaded', function() {
  // Get modal elements
  const researchModal = document.getElementById('research-modal');
  const modalTitle = document.getElementById('research-modal-title');
  const modalDetails = document.getElementById('research-modal-details');
  const modalLink = document.getElementById('research-modal-link');
  const closeModalBtn = researchModal.querySelector('.close-modal');

  // Attach click listeners to research paper buttons
  document.querySelectorAll('#research .paper-button').forEach((btn, idx) => {
    btn.addEventListener('click', function(e) {
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
  closeModalBtn.addEventListener('click', function() {
    researchModal.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Optional: Close modal when clicking outside modal content
  researchModal.addEventListener('click', function(e) {
    if (e.target === researchModal) {
      researchModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});