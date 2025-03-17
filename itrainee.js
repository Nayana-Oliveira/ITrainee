document.addEventListener('DOMContentLoaded', () => {

    const tags = document.querySelectorAll('.search-section .tag');
    const jobCards = document.querySelectorAll('.job-card');
    const searchInput = document.querySelector('.search-input');
    let activeTag = null;

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            
            if(activeTag !== tag.textContent.trim().toLowerCase()) {
                tag.classList.add('active');
                activeTag = tag.textContent.trim().toLowerCase();
            } else {
                activeTag = null;
            }
            
            filterJobs();
        });
    });

    searchInput.addEventListener('input', filterJobs);

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        
        jobCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const tags = card.dataset.tags.toLowerCase();
            
            const matchesSearch = title.includes(searchTerm);
            const matchesTag = !activeTag || tags.includes(activeTag);
            
            card.style.display = (matchesSearch && matchesTag) ? 'block' : 'none';
        });
    }

    window.addEventListener('scroll', () => {
        tags.forEach(tag => tag.classList.remove('active'));
        activeTag = null;
        filterJobs();
    });
});