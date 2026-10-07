export default function MedoraLogo({
  size = 32,
  color = "white",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
    >
      {/* 6-petal swirling pinwheel – outline only, matches Medora Health brand */}
      {/* Petal 1: top-right sweep */}
      <path
        d="M50,47 C55,32 68,22 78,26 C88,30 90,44 80,54 C73,61 60,62 50,53 Z"
        stroke={color}
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Petal 2: right sweep */}
      <path
        d="M53,50 C68,45 80,52 80,63 C80,74 68,80 57,75 C49,70 47,60 53,50 Z"
        stroke={color}
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Petal 3: bottom-right sweep */}
      <path
        d="M50,53 C60,65 58,78 50,82 C42,86 30,80 28,68 C27,59 36,51 50,53 Z"
        stroke={color}
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Petal 4: bottom-left sweep */}
      <path
        d="M47,50 C44,66 32,74 22,70 C12,66 10,52 20,44 C28,37 42,40 47,50 Z"
        stroke={color}
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Petal 5: left sweep */}
      <path
        d="M50,47 C35,52 22,45 20,35 C18,25 30,18 42,23 C51,27 54,38 50,47 Z"
        stroke={color}
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Petal 6: top-left sweep */}
      <path
        d="M53,50 C48,34 55,22 64,20 C73,18 82,28 78,40 C75,49 64,54 53,50 Z"
        stroke={color}
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
