let hiestZ = 1;

class Paper {
    holdingPaper = false;
    prevMouseX = 0;
    prevMouseY = 0;
    mouseX = 0;
    mouseY = 0;
    valocityX = 0;
    valocityY = 0;
    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
        paper.addEventListener("mousedown", (e) => {
            this.holdingPaper = true;
            paper.style.zIndex = hiestZ;
            hiestZ++;

            if (e.button === 0) {
                this.prevMouseX = e.clientX;
                this.prevMouseY = e.clientY;
            }
        });

        document.addEventListener("mousemove", (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            this.valocityX = this.mouseX - this.prevMouseX;
            this.valocityY = this.mouseY - this.prevMouseY;

            if (this.holdingPaper) {
                this.currentPaperX += this.valocityX;
                this.currentPaperY += this.valocityY;

                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                // Apply the correct transform syntax
                paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
            }
        });

        window.addEventListener("mouseup", () => {
            this.holdingPaper = false; // Reset the holding state on mouseup
        });
    }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});
