

function encriptar() {

    let texto = document.getElementById('firstTextArea').value;
    let lista_texto = [];
    let texto_encriptado = '';
    let flag_error = false;

    for (let i = 0; i < texto.length; i++) {
        lista_texto.push(texto[i]);
    }

    let letras_encriptadas = lista_texto.map((letra) => {

        if ((letra.codePointAt(0) >= 48 && letra.codePointAt(0) <= 57)
            || (letra.codePointAt(0) >= 97 && letra.codePointAt(0) <= 122)) {

            if (letra === 'a') return 'ai';
            if (letra === 'e') return 'enter';
            if (letra === 'i') return 'imes';
            if (letra === 'o') return 'ober';
            if (letra === 'u') return 'ufat';
            return letra;

        } else {
            alert('Tu mensaje tiene algun caracter prohibido (mayusculas, caracter especial o acentos) , corrigelo!! ');
            flag_error = true;
        }

    });

    if (flag_error) { letras_encriptadas = [] };

    for (let i = 0; i < letras_encriptadas.length; i++) {
        texto_encriptado = texto_encriptado + letras_encriptadas[i];
    }

    if (!flag_error) {

        // appear and set value on seconTextArea
        document.getElementById('secondTextArea').style.display = 'inline';
        document.getElementById('buttonCopy').style.display = 'inline';
        document.getElementById('secondTextArea').value = texto_encriptado;

        ajustarAlturaTextArea();

        //clean firstTextArea up and hide the image
        document.getElementById('firstTextArea').value = '';
        document.getElementById('img').style.display = 'none';

        document.querySelector('p').style.display = 'none';
        document.getElementById('p').style.display = 'none';
    }
}

function desencriptar() {

    let texto = document.getElementById('firstTextArea').value;
    let palabras_juntas = '';


    let lista_palabras = texto.split(' ').map((palabra) => {
        let silabas_juntas = '';

        do {
            if (palabra.includes('enter')) {
                palabra = palabra.replace('enter', 'e ');
            }

            else if (palabra.includes('imes')) {
                palabra = palabra.replace('imes', 'i ');
            }

            else if (palabra.includes('ai')) {
                palabra = palabra.replace('ai', 'a ');
            }

            else if (palabra.includes('ober')) {
                palabra = palabra.replace('ober', 'o ');
            }

            else if (palabra.includes('ufat')) {
                palabra = palabra.replace('ufat', 'u ');
            }

            else { palabra = palabra; }

        } while (palabra.includes('enter') || palabra.includes('imes') || palabra.includes('ai') ||
        palabra.includes('ober') || palabra.includes('ufat'))

        palabra.split(' ').map((silabas) => {
            silabas_juntas = silabas_juntas + silabas;
        });

        return silabas_juntas;
    });

    for (let i = 0; i < lista_palabras.length; i++) {
        palabras_juntas = palabras_juntas + `${lista_palabras[i]} `;
    }


    document.getElementById('secondTextArea').value = palabras_juntas;
    document.getElementById('firstTextArea').value = '';
    ajustarAlturaTextArea();
}

function copyText() {
    let valorTextArea = document.getElementById('secondTextArea');
    navigator.clipboard.writeText(valorTextArea.value);

    valorTextArea.select();
}

function ajustarAlturaTextArea() {
    const textArea = document.getElementById('secondTextArea');
    if (window.matchMedia('(max-width: 768px)').matches) {
        textArea.style.height = 'auto'; // Resetea la altura
        textArea.style.height = `${textArea.scrollHeight}px`; // Ajusta la altura según el contenido
    } else {
        textArea.style.height = '70%'
    }
}

window.addEventListener('resize', ajustarAlturaTextArea);
