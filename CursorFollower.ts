import definePlugin from "@utils/types";

export default definePlugin({
    name: "CursorFollower",
    description: "A following Penis! Made by MisterX12345",
    authors: ["MISTERX"],

    start() {
        const img = document.createElement("img");
        img.id = "arrow-follower";
        img.src = "https://cdn-icons-png.flaticon.com/512/6830/6830721.png";
        img.style.position = "fixed";
        img.style.pointerEvents = "none";
        img.style.width = "64px";
        img.style.zIndex = "999999";
        img.style.transformOrigin = "center center";
        document.body.appendChild(img);

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;

        function move(e: MouseEvent) {
            targetX = e.clientX;
            targetY = e.clientY;
        }

        document.addEventListener("mousemove", move);

        let animationFrame: number;
        function follow() {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const angleRad = Math.atan2(dy, dx);
            const angleDeg = angleRad * (180 / Math.PI) - 90;

            const halfWidth = img.width / 2;
            const halfHeight = img.height / 2;
            img.style.transform = `translate(${currentX - halfWidth}px, ${currentY - halfHeight}px) rotate(${angleDeg}deg)`;

            animationFrame = requestAnimationFrame(follow);
        }
        follow();

        this._cleanup = () => {
            cancelAnimationFrame(animationFrame);
            document.removeEventListener("mousemove", move);
            img.remove();
        };
    },

    stop() {
        this._cleanup?.();
    }
});
