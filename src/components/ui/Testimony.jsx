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
                {/* Green ring */}
                <div className="relative w-[90px] h-[90px] rounded-full border-[3px] border-green-500 p-[3px] bg-white">
                    {/* Online dot */}
                    <span className="absolute top-0.5 right-1.5 z-10 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-white" />

                    {/* Photo or fallback */}
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
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
                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white rounded-full px-2.5 py-1 text-[11px] shadow-md flex items-center gap-1">
                    <span className="font-bold text-gray-800">{name}</span>
                    <span className="text-green-500 font-bold">•</span>
                    <span className="text-gray-500 font-normal">{role}</span>
                </div>
            </div>

            {/* ── Speech bubble ── */}
            <div className="relative mt-1 bg-white rounded-2xl px-4 py-3 shadow-md text-[13px] text-gray-800 leading-relaxed max-w-[220px]">
                {/* Left-pointing tail */}
                <span
                    className="absolute -left-2 top-4 w-0 h-0"
                    style={{
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderRight: "8px solid white",
                    }}
                />
                "{quote}"
            </div>
        </div>
    );
}

export default Testimony;