document.addEventListener('DOMContentLoaded', () => {
    const semestreSelect = document.getElementById('semestre');
    const materiaSelect = document.getElementById('materia');
    const toggleUploadFormButton = document.getElementById('toggleUploadForm');
    console.log('Botón de Subida de Archivos:', toggleUploadFormButton);
    const uploadModal = document.getElementById('uploadModal');
    const closeButton = document.querySelector('.close-button');

    toggleUploadFormButton.addEventListener('click', () => {
        uploadModal.classList.add('show'); // Mostrar el modal
    });

    closeButton.addEventListener('click', () => {
        uploadModal.classList.remove('show'); // Ocultar el modal
    });

    window.addEventListener('click', (event) => {
        if (event.target == uploadModal) {
            uploadModal.classList.remove('show'); // Ocultar el modal si se hace clic fuera
        }
    });

    const uploadForm = document.getElementById('uploadForm');
    const fileUpload = document.getElementById('fileUpload');
    const filePreview = document.getElementById('filePreview');

    fileUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            filePreview.innerHTML = ''; // Limpiar previsualización anterior

            if (fileType.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100px';
                    img.style.maxHeight = '100px';
                    filePreview.appendChild(img);
                };
                reader.readAsDataURL(file);
            } else if (fileType === 'application/pdf') {
                filePreview.innerHTML = '<p>Archivo PDF seleccionado: ' + file.name + '</p>';
            } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                filePreview.innerHTML = '<p>Archivo DOCX seleccionado: ' + file.name + '</p>';
            } else {
                filePreview.innerHTML = '<p>Archivo seleccionado: ' + file.name + '</p>';
            }
        } else {
            filePreview.innerHTML = '';
        }
    });

            uploadForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                const formData = new FormData();
                formData.append('semestre', semestreSelect.value);
                formData.append('materia', materiaSelect.value.split('.')[0]);
                if (fileUpload.files.length > 0) {
                    formData.append('fileUpload', fileUpload.files[0]);
                }

                try {
                    const response = await fetch('upload.php', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (result.success) {
                        alert('¡Éxito! ' + result.message);
                        uploadModal.classList.remove('show');
                        uploadForm.reset();
                        filePreview.innerHTML = '';
                    } else {
                        alert('Error: ' + result.message);
                    }
                } catch (error) {
                    console.error('Error al enviar el formulario:', error);
                    alert('Hubo un error de conexión o del servidor.');
                }
            });

    const materiasPorSemestre = {
        primero: [
            { value: 'algebra.html', text: 'Álgebra' },
            { value: 'compub1.html', text: 'Computación Básica 1' },
            { value: 'desarrollo.html', text: 'Desarrollo Humano' },
            { value: 'dp.html', text: 'Desarrollo Personal' },
            { value: 'expresion1.html', text: 'Expresión Oral y Escrita 1' },
            { value: 'filo1.html', text: 'Filosofía 1' },
            { value: 'historia1.html', text: 'Historia de México Contemporáneo 1' },
            { value: 'ingles1.html', text: 'Inglés 1' },
            { value: 'orientacion1.html', text: 'Orientación Educativa 1' }
        ],
        segundo: [
            { value: 'biologia.html', text: 'Biología' },
            { value: 'compub2.html', text: 'Computación Básica 2' },
            { value: 'comunicacion.html', text: 'Comunicación' },
            { value: 'expresion2.html', text: 'Expresión Oral y Escrita 2' },
            { value: 'filo2.html', text: 'Filosofía 2' },
            { value: 'geometria.html', text: 'Geometría' },
            { value: 'historia2.html', text: 'Historia de México Contemporáneo 2' },
            { value: 'ingles2.html', text: 'Inglés 2' },
            { value: 'orientacion2.html', text: 'Orientación Educativa 2' }
        ],
        tercero: [
            { value: 'aero3.html', text: 'Aeroespacial 3' },
            { value: 'algoritmia.html', text: 'Algoritmia y Programación' },
            { value: 'auto3.html', text: 'Automotriz 3' },
            { value: 'coci.html', text: 'Ciencias de la Comunicación' },
            { value: 'compu3.html', text: 'Computación 3' },
            { value: 'control3.html', text: 'Control 3' },
            { value: 'dibujo1.html', text: 'Dibujo 1' },
            { value: 'ensamblado.html', text: 'Ensamblado' },
            { value: 'entorno.html', text: 'Entorno Socioeconómico de México' },
            { value: 'fisica1.html', text: 'Física 1' },
            { value: 'geometriaanalitica.html', text: 'Geometría Analítica' },
            { value: 'ingles3.html', text: 'Inglés 3' },
            { value: 'mac3.html', text: 'Manufactura Asistida por Computadora 3' },
            { value: 'multimedia.html', text: 'Multimedia' },
            { value: 'quimica1.html', text: 'Química 1' }
        ],
        cuarto: [
            { value: 'aero4.html', text: 'Aeroespacial 4' },
            { value: 'aplicacioneselect.html', text: 'Aplicaciones Electrónicas' },
            { value: 'auto4.html', text: 'Automotriz 4' },
            { value: 'calculodif.html', text: 'Cálculo Diferencial' },
            { value: 'compu4.html', text: 'Computación 4' },
            { value: 'control4.html', text: 'Control 4' },
            { value: 'dibujo2.html', text: 'Dibujo 2' },
            { value: 'fisica2.html', text: 'Física 2' },
            { value: 'ingles4.html', text: 'Inglés 4' },
            { value: 'mac4.html', text: 'Manufactura Asistida por Computadora 4' },
            { value: 'progmodular.html', text: 'Programación Modular' },
            { value: 'quimica2.html', text: 'Química 2' },
            { value: 'redes1.html', text: 'Redes 1' },
            { value: 'sisdig4.html', text: 'Sistemas Digitales 4' },
            { value: 'sistemasope.html', text: 'Sistemas Operativos' }
        ],
        quinto: [
            { value: 'aero5.html', text: 'Aeroespacial 5' },
            { value: 'auto5.html', text: 'Automotriz 5' },
            { value: 'bases.html', text: 'Bases de Datos' },
            { value: 'calculoint.html', text: 'Cálculo Integral' },
            { value: 'compu5.html', text: 'Computación 5' },
            { value: 'control5.html', text: 'Control 5' },
            { value: 'desarrolloapps.html', text: 'Desarrollo de Aplicaciones' },
            { value: 'fisica3.html', text: 'Física 3' },
            { value: 'ingles5.html', text: 'Inglés 5' },
            { value: 'mac5.html', text: 'Manufactura Asistida por Computadora 5' },
            { value: 'orientacion3.html', text: 'Orientación Educativa 3' },
            { value: 'portales.html', text: 'Portales Web' },
            { value: 'quimica3.html', text: 'Química 3' },
            { value: 'redes2.html', text: 'Redes 2' },
            { value: 'sisdig5.html', text: 'Sistemas Digitales 5' }
        ],
        sexto: [
            { value: 'aero6.html', text: 'Aeroespacial 6' },
            { value: 'animacion.html', text: 'Animación' },
            { value: 'appsmultimedia.html', text: 'Aplicaciones Multimedia' },
            { value: 'auto6.html', text: 'Automotriz 6' },
            { value: 'compu6.html', text: 'Computación 6' },
            { value: 'control.html', text: 'Control' },
            { value: 'fisica4.html', text: 'Física 4' },
            { value: 'ingles6.html', text: 'Inglés 6' },
            { value: 'mac6.html', text: 'Manufactura Asistida por Computadora 6' },
            { value: 'orientacion4.html', text: 'Orientación Educativa 4' },
            { value: 'probabilidad.html', text: 'Probabilidad' },
            { value: 'progsistemas.html', text: 'Programación de Sistemas' },
            { value: 'quimica4.html', text: 'Química 4' },
            { value: 'seguridadinfo.html', text: 'Seguridad Informática' },
            { value: 'sisdig6.html', text: 'Sistemas Digitales 6' }
        ]
    };

    semestreSelect.addEventListener('change', () => {
        const selectedSemestre = semestreSelect.value;
        materiaSelect.innerHTML = '<option value="">Selecciona una materia</option>';
                materiaSelect.disabled = true;

                if (selectedSemestre && materiasPorSemestre[selectedSemestre]) {
                    const materias = materiasPorSemestre[selectedSemestre];
                    materias.forEach(materia => {
                        const option = document.createElement('option');
                        option.value = materia.value;
                        option.textContent = materia.text;
                        materiaSelect.appendChild(option);
                    });
                    materiaSelect.disabled = false; // Habilitar el select de materia
                }
    });

    // Función para obtener y mostrar archivos
    async function fetchAndDisplayFiles() {
        const path = window.location.pathname;
        const pathParts = path.split('/');
        const semestre = pathParts[pathParts.length - 2]; // e.g., "primero", "segundo"
        const materiaHtml = pathParts[pathParts.length - 1]; // e.g., "algebra.html"
        const materia = materiaHtml.split('.')[0]; // e.g., "algebra"

        console.log('Semestre extraído de la URL:', semestre);
        console.log('Materia extraída de la URL:', materia);

        const fileListContainer = document.getElementById('file-list-container');
        console.log('Elemento file-list-container:', fileListContainer);

        if (fileListContainer && semestre && materia) {
            try {
                const response = await fetch(`list_files.php?semestre=${semestre}&materia=${materia}`);
                const result = await response.json();

                if (result.success && result.files.length > 0) {
                    fileListContainer.innerHTML = '<h2>Archivos Disponibles</h2>';
                    const ul = document.createElement('ul');
                    result.files.forEach(file => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = file.ruta_archivo; // La ruta completa al archivo
                        a.textContent = file.nombre_original;
                        a.target = '_blank'; // Abrir en una nueva pestaña
                        li.appendChild(a);
                        ul.appendChild(li);
                    });
                    fileListContainer.appendChild(ul);
                } else {
                    fileListContainer.innerHTML = '<p>No hay archivos disponibles para esta materia y semestre.</p>';
                }
            } catch (error) {
                console.error('Error al obtener los archivos:', error);
                fileListContainer.innerHTML = '<p>Error al cargar los archivos.</p>';
            }
        }
    }

    // Llamar a la función al cargar la página
    fetchAndDisplayFiles();
});