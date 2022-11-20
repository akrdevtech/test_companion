import { SvgIcon, SvgIconProps } from "@mui/material";

function FilledAddCourseIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path d="M15 6V8H18V11H20V8H23V6H20V3H18V6H15Z"  />
            <path d="M10 7L1 12L10 17L19 12L10 7Z"  />
            <path d="M10 18.5L4 15V19L10 22L16 19V15L10 18.5Z"  />
        </SvgIcon>
    );
}

export default FilledAddCourseIcon