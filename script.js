let hiestZ = 1;

class Paper {
    holdingPaper = false;
    prevMouseX = 0;
    prevMouseY = 0;
    mouseX = 0;
    mouseY = 0;
    velocityX = 0;
    velocityY = 0;
    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
        // Handle mouse down and touch start events
        const startDrag = (e) => {
            this.holdingPaper = true;
            paper.style.zIndex = hiestZ;
            hiestZ++;

            // Check if the event is a touch event
            if (e.type === 'touchstart') {
                this.prevMouseX = e.touches[0].clientX;
                this.prevMouseY = e.touches[0].clientY;
            } else {
                // Handle mouse events
                if (e.button === 0) {
                    this.prevMouseX = e.clientX;
                    this.prevMouseY = e.clientY;
                }
            }

            e.preventDefault();
        };

        // Handle mouse move and touch move events
        const moveDrag = (e) => {
            if (!this.holdingPaper) return;

            if (e.type === 'touchmove') {
                this.mouseX = e.touches[0].clientX;
                this.mouseY = e.touches[0].clientY;
            } else {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            }

            this.velocityX = this.mouseX - this.prevMouseX;
            this.velocityY = this.mouseY - this.prevMouseY;

            this.currentPaperX += this.velocityX;
            this.currentPaperY += this.velocityY;

            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;

            paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;

            e.preventDefault();
        };

        // Handle mouse up and touch end events
        const endDrag = () => {
            this.holdingPaper = false;
        };

        // Add event listeners for both mouse and touch events
        paper.addEventListener('mousedown', startDrag);
        paper.addEventListener('touchstart', startDrag);

        document.addEventListener('mousemove', moveDrag);
        document.addEventListener('touchmove', moveDrag);

        window.addEventListener('mouseup', endDrag);
        window.addEventListener('touchend', endDrag);
        window.addEventListener('touchcancel', endDrag);
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper) => {
    const p = new Paper();
    p.init(paper);
});
