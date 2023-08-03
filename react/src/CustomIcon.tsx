import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import MailIcon from '@mui/icons-material/Mail';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';


const icons = [HomeIcon, SchoolIcon, MailIcon, TextSnippetIcon];

const CustomIcon = ({ index }) => {
  const IconComponent = icons[index % icons.length];
  return <IconComponent />;
};

export default CustomIcon;