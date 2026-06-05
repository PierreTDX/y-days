import { cn } from "@/lib/utils";

/**
 * Testimony — a reusable testimonial card component.
 *
 * Usage:
 * <Testimony
 *   avatarSrc="/marie.jpg"
 *   avatarAlt="Photo de Marie"
 *   quote="Lorem ipsum delare ipsa delor ipsum delare ipsa delor"
 *   name="Marie"
 *   role="Enseignante CE1"
 * />
 */
export function Testimony({
    avatarSrc,
    avatarAlt = "Avatar",
    quote,
    name,
    role,
    className,
}) {
    return (
        <div className={cn("relative flex items-start gap-3", className)}>
            {/* ── Avatar column ── */}
            <div className="relative flex-shrink-0">
                {/* Avatar and ring container */}
                <div className="relative z-10 w-[170px] h-[170px] flex items-center justify-center">
                    {/* Gradient ring with transparent center using CSS mask */}
                    <div
                        className="absolute inset-0 rounded-full p-[6px] bg-gradient-to-b from-[#E8FFF0] to-[#4ADE80]"
                        style={{
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                        }}
                    />

                    {/* Online dot */}
                    <span className="absolute top-4.5 left-5 z-10 w-4 h-4 rounded-full bg-[#E8FFF0] border-[3px] border-[#4ADE80]" />

                    {/* Photo or fallback */}
                    <div className="relative z-10 w-[142px] h-[142px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {avatarSrc ? (
                            <img
                                src={avatarSrc}
                                alt={avatarAlt}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            /* Neutral silhouette fallback */
                            <svg
                                viewBox="0 0 84 84"
                                fill="none"
                                className="w-full h-full"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="84" height="84" rx="42" fill="#e5e7eb" />
                                <ellipse cx="42" cy="34" rx="14" ry="16" fill="#9ca3af" />
                                <ellipse cx="42" cy="72" rx="26" ry="18" fill="#9ca3af" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Name tag pill — centered below avatar */}
                <div className="absolute h-8 -bottom-5.5 left-1/2 -translate-x-1/2 rotate-[3.5deg] whitespace-nowrap bg-white rounded-[16px] px-2.5 py-1 text-[11px] shadow-md flex items-center gap-1" style={{ fontFamily: "'Comfortaa', sans-serif" }}>
                    <span className="font-bold text-gray-800">{name}</span>
                    <span className="text-green-500 font-bold">•</span>
                    <span className="text-gray-500 font-normal">{role}</span>
                </div>
            </div>

            {/* ── Speech bubble ── */}
            <div className="relative -bottom-7 right-10 z-20 -ml-4 -rotate-[1.5deg] mt-1 bg-white rounded-2xl px-4 py-3 shadow-md text-xs leading-snug tracking-normal text-gray-800 max-w-[180px]" style={{ fontFamily: "'Comfortaa', sans-serif" }}>
                {/* Left-pointing tail */}
                <span
                    className="absolute -left-2 top-4 w-0 h-0"
                    style={{
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderRight: "8px solid white",
                    }}
                />
                <div>"{quote}"</div>
            </div>
        </div>
    );
}

export default Testimony;