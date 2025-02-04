const SvgThreeDots = (props: { [key: string]: unknown }) => (
    <svg
        width="12"
        height="4"
        viewBox="0 0 12 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <ellipse
            cx="2"
            cy="1.72606"
            rx="1.5"
            ry="1.47981"
            fill="currentColor"
        />
        <ellipse
            cx="6"
            cy="1.72606"
            rx="1.5"
            ry="1.47981"
            fill="currentColor"
        />
        <ellipse
            cx="10"
            cy="1.72606"
            rx="1.5"
            ry="1.47981"
            fill="currentColor"
        />
    </svg>
);

export default SvgThreeDots;
