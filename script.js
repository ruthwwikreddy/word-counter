        const textInput = document.getElementById('textInput');
        const highlightBtn = document.getElementById('highlightBtn');
        const highlights = document.getElementById('highlights');
        let showingHighlights = false;

        function updateCounts() {
            const text = textInput.value;
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            const uniqueWordCount = new Set(words.map(w => w.toLowerCase())).size;

            document.getElementById('wordCount').textContent = words.length;
            document.getElementById('uniqueWords').textContent = uniqueWordCount;
            document.getElementById('charCount').textContent = text.length;
            document.getElementById('readingTime').textContent = 
                Math.ceil(words.length / 200) + ' min';
        }

        function findSpecialWords() {
            const text = textInput.value;
            const words = text.split(/\s+/);
            const longWords = words.filter(word => word.length > 8);
            
            const wordCount = {};
            words.forEach(word => {
                const lower = word.toLowerCase();
                wordCount[lower] = (wordCount[lower] || 0) + 1;
            });
            const repetitive = Object.entries(wordCount)
                .filter(([word, count]) => count > 2 && word.length > 0)
                .map(([word]) => word);

            let html = '';
            if (longWords.length) {
                html += `<div class="highlight-box">
                    <strong>Long words (>8 characters):</strong><br>
                    ${longWords.join(', ')}
                </div>`;
            }
            if (repetitive.length) {
                html += `<div class="highlight-box">
                    <strong>Repetitive words (used >2 times):</strong><br>
                    ${repetitive.join(', ')}
                </div>`;
            }
            highlights.innerHTML = html;
        }

        textInput.addEventListener('input', () => {
            updateCounts();
            if (showingHighlights) findSpecialWords();
        });

        highlightBtn.addEventListener('click', () => {
            showingHighlights = !showingHighlights;
            highlights.style.display = showingHighlights ? 'block' : 'none';
            highlightBtn.textContent = showingHighlights ? 'Hide Highlights' : 'Show Highlights';
            if (showingHighlights) findSpecialWords();
        });
