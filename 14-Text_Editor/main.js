document.addEventListener('DOMContentLoaded', () => {
    const BoldFont = document.getElementById('Bold');
    const ItalicFont = document.getElementById('Italic');
    const UnderlineText = document.getElementById('Underline');
    const HighlightText = document.getElementById('Highlight');
    const Eraser = document.getElementById('Eraser');

    const AlignLeft = document.getElementById('AlignLeft');
    const AlignCenter = document.getElementById('AlignCenter');
    const AlignRight = document.getElementById('AlignRight');

    const FontFamilySelect = document.getElementById('FontFamily');
    const FontSizeSelect = document.getElementById('FontSize');
    const TextColorInput = document.getElementById('TextColor');
    const BgColorInput = document.getElementById('BgColor');

    const Editor = document.getElementById("Editor");
    const WordCountDisplay = document.getElementById("WordCount");

    const executeCommand = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const updateToolbarStates = () => {
        BoldFont.classList.toggle('active', document.queryCommandState('bold'));
        ItalicFont.classList.toggle('active', document.queryCommandState('italic'));
        UnderlineText.classList.toggle('active', document.queryCommandState('underline'));

        const currentFontFamily = document.queryCommandValue('fontName').replace(/"/g, '');
        if (FontFamilySelect.value !== currentFontFamily) {
            FontFamilySelect.value = currentFontFamily || 'Arial';
        }

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let element = selection.getRangeAt(0).commonAncestorContainer;
            if (element.nodeType === 3) element = element.parentNode;

            let computedFontSize = window.getComputedStyle(element).fontSize;
            if (FontSizeSelect.value !== computedFontSize && Array.from(FontSizeSelect.options).some(opt => opt.value === computedFontSize)) {
                FontSizeSelect.value = computedFontSize;
            } else if (!Array.from(FontSizeSelect.options).some(opt => opt.value === computedFontSize)) {
                FontSizeSelect.value = '16px';
            }
        } else {
            FontSizeSelect.value = '16px';
        }

        const currentTextColor = document.queryCommandValue('forecolor');
        if (currentTextColor && currentTextColor !== 'initial') {
            TextColorInput.value = rgbToHex(currentTextColor);
        } else {
            TextColorInput.value = '#000000';
        }

        const currentBgColor = document.queryCommandValue('backcolor');
        if (currentBgColor && currentBgColor !== 'initial') {
            BgColorInput.value = rgbToHex(currentBgColor);
            HighlightText.classList.add('active');
        } else {
            BgColorInput.value = '#FFFF00';
            HighlightText.classList.remove('active');
        }

        const currentAlign = document.queryCommandValue('justifyLeft') ? 'left' :
                             document.queryCommandValue('justifyCenter') ? 'center' :
                             document.queryCommandValue('justifyRight') ? 'right' : 'left';

        AlignLeft.classList.toggle('active', currentAlign === 'left');
        AlignCenter.classList.toggle('active', currentAlign === 'center');
        AlignRight.classList.toggle('active', currentAlign === 'right');
    };

    function rgbToHex(rgb) {
        if (!rgb || rgb.startsWith('#')) return rgb;
        const parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!parts) return rgb;
        const hex = (num) => {
            const h = Number(num).toString(16);
            return h.length === 1 ? '0' + h : h;
        };
        return '#' + hex(parts[1]) + hex(parts[2]) + hex(parts[3]);
    }

    const updateWordCount = () => {
        const text = Editor.innerText.trim();
        if (text === '') {
            WordCountDisplay.textContent = 'Words: 0';
            return;
        }
        const words = text.split(/\s+/).filter(word => word.length > 0);
        WordCountDisplay.textContent = `Words: ${words.length}`;
    };

    BoldFont.addEventListener("click", () => {
        executeCommand('bold');
        updateToolbarStates();
    });
    ItalicFont.addEventListener("click", () => {
        executeCommand('italic');
        updateToolbarStates();
    });
    UnderlineText.addEventListener("click", () => {
        executeCommand('underline');
        updateToolbarStates();
    });
    HighlightText.addEventListener("click", () => {
        executeCommand('backcolor', BgColorInput.value);
        updateToolbarStates();
    });
    Eraser.addEventListener("click", () => {
        executeCommand('removeFormat');
        executeCommand('forecolor', '#000000');
        executeCommand('backcolor', '#FFFFFF');
        executeCommand('fontName', 'Arial');
        if (window.getSelection().rangeCount === 0) {
            Editor.style.fontFamily = 'Arial';
            Editor.style.fontSize = '16px';
        }
        updateToolbarStates();
    });

    AlignLeft.addEventListener("click", () => {
        executeCommand('justifyLeft');
        updateToolbarStates();
    });
    AlignCenter.addEventListener("click", () => {
        executeCommand('justifyCenter');
        updateToolbarStates();
    });
    AlignRight.addEventListener("click", () => {
        executeCommand('justifyRight');
        updateToolbarStates();
    });

    FontFamilySelect.addEventListener("change", (e) => {
        executeCommand('fontName', e.target.value);
        updateToolbarStates();
    });

    FontSizeSelect.addEventListener("change", (e) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            span.style.fontSize = e.target.value;
            try {
                range.surroundContents(span);
                selection.removeAllRanges();
                selection.addRange(range);
            } catch (error) {
                executeCommand('fontSize', '4');
                console.warn("Could not surround contents for font size, applying fallback.", error);
            }
        } else {
            Editor.style.fontSize = e.target.value;
            executeCommand('fontSize', '4');
        }
        updateToolbarStates();
    });

    TextColorInput.addEventListener("input", (e) => {
        executeCommand('forecolor', e.target.value);
        updateToolbarStates();
    });

    BgColorInput.addEventListener("input", (e) => {
        executeCommand('backcolor', e.target.value);
        updateToolbarStates();
    });

    Editor.addEventListener("input", () => {
        updateWordCount();
        updateToolbarStates();
    });
    Editor.addEventListener("mouseup", updateToolbarStates);
    Editor.addEventListener("keyup", updateToolbarStates);
    Editor.addEventListener("paste", updateWordCount);

    updateWordCount();
    updateToolbarStates();
    Editor.focus();
});
