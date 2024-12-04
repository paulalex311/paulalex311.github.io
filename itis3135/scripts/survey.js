    const form = document.getElementById('intro-form');
    const coursesContainer = document.getElementById('courses');
    const addCourseBtn = document.getElementById('add-course-btn');

    addCourseBtn.addEventListener('click', () => {
        const courseInput = document.createElement('input');
        courseInput.type = 'text';
        courseInput.name = 'course';
        courseInput.placeholder = 'Enter course name';
        courseInput.required = true;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.type = 'button';
        deleteBtn.addEventListener('click', () => {
            coursesContainer.removeChild(courseInput);
            coursesContainer.removeChild(deleteBtn);
        });

        coursesContainer.appendChild(courseInput);
        coursesContainer.appendChild(deleteBtn);
    });

    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            alert('Please fill out all required fields.');
            e.preventDefault();
            return;
        }

        e.preventDefault();
        const formData = new FormData(form);
        const output = document.createElement('div');
        output.innerHTML = `
            <h3>Your BYO Intro Page:</h3>
            <p><strong>Name:</strong> ${formData.get('name')}</p>
            <p><strong>Mascot:</strong> ${formData.get('mascot')}</p>
            <p><strong>Image Caption:</strong> ${formData.get('image-caption')}</p>
            <p><strong>Personal Background:</strong> ${formData.get('personal-background')}</p>
            <p><strong>Professional Background:</strong> ${formData.get('professional-background')}</p>
            <p><strong>Academic Background:</strong> ${formData.get('academic-background')}</p>
            <p><strong>Web Development Background:</strong> ${formData.get('web-dev-background')}</p>
            <p><strong>Primary Computer Platform:</strong> ${formData.get('computer-platform')}</p>
            <p><strong>Courses Currently Taking:</strong> ${[...formData.getAll('course')].join(', ')}</p>
            <p><strong>Funny Thing:</strong> ${formData.get('funny-thing')}</p>
            <p><strong>Anything Else:</strong> ${formData.get('anything-else')}</p>
        `;

        form.replaceWith(output);

        const resetLink = document.createElement('button');
        resetLink.textContent = 'Reset';
        resetLink.addEventListener('click', () => {
            location.reload();
        });
        document.body.appendChild(resetLink);
    });

    form.addEventListener('reset', () => {

        const courseInputs = coursesContainer.querySelectorAll('input[type="text"]');
        courseInputs.forEach((input) => input.remove());
        
        const deleteButtons = coursesContainer.querySelectorAll('button[type="button"]');
        deleteButtons.forEach((button) => button.remove());
    });

    const imageFile = formData.get('image');
if (imageFile && (imageFile.type === 'image/png' || imageFile.type === 'image/jpeg')) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgElement = document.createElement('img');
        imgElement.src = event.target.result;
        imgElement.alt = formData.get('image-caption');
        imgElement.style.maxWidth = '400px';
        imgElement.style.display = 'block'; 
        imgElement.style.marginTop = '10px';
        output.appendChild(imgElement);
    };
    reader.readAsDataURL(imageFile);
}