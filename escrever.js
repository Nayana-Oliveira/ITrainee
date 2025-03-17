const textarea = document.getElementById('threadContent');
const charCounter = document.querySelector('.char-counter span');

if (textarea && charCounter) {
    textarea.addEventListener('input', () => {
        const currentLength = textarea.value.length;
        charCounter.textContent = currentLength;
        
        if (currentLength > 500) {
            charCounter.style.color = 'var(--accent-color)';
        } else {
            charCounter.style.color = 'inherit';
        }
    });
}

document.getElementById('threadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        title: this.querySelector('#threadTitle').value.trim(),
        category: this.querySelector('#threadCategory').value,
        content: this.querySelector('#threadContent').value.trim(),
        tags: this.querySelector('#threadTags').value
                     .split(',')
                     .map(tag => tag.trim())
                     .filter(tag => tag)
    };
    
    if (formValidation(formData)) {
        console.log('Dados do formulário:', formData);
        showSuccessMessage();
        this.reset();
        charCounter.textContent = '0';
    }
});

function formValidation(data) {
    if (!data.title || data.title.length < 10) {
        alert('Título deve ter pelo menos 10 caracteres');
        return false;
    }
    
    if (!data.category) {
        alert('Selecione uma categoria');
        return false;
    }
    
    if (data.content.length < 100) {
        alert('Descrição deve ter pelo menos 100 caracteres');
        return false;
    }
    
    return true;
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Dúvida publicada com sucesso!
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('invalid', () => {
        input.style.borderColor = 'var(--accent-color)';
    });
    
    input.addEventListener('input', () => {
        if (input.checkValidity()) {
            input.style.borderColor = 'var(--text-color)';
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("threadForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        setTimeout(() => {
            alert("Postagem publicada com sucesso!"); 
            window.location.href = "forum.html"; 
        }, 500); 
    });
});
