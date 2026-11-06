import type { Ref } from "react";
import UtilityIcon from "./UtilityIcon";

interface CloseButtonProps {
	onClick: () => void;
	label?: string;
	ref?: Ref<HTMLButtonElement>;
}

export default function CloseButton({
	onClick,
	label = "Close",
	ref
}: CloseButtonProps) {
	return (
		<button
			ref={ref}
			type="button"
			className="utility-button close-button"
			aria-label={label}
			title={label}
			onClick={onClick}
		>
			<UtilityIcon name="close" />
		</button>
	);
}