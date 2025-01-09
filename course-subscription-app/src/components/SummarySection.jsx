import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PropTypes from "prop-types";

const cardStyles = {
  width: { xs: "100%", sm: "200px", md: "300px" },
  maxWidth: "100%",
  height: "250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    cursor: "pointer",
  },
};

const cardContentStyles = {
  color: "#fff",
  fontSize: { xs: "20px", md: "28px" },
  fontWeight: "bold",
  textAlign: "center",
};

const iconStyle = {
  fontSize: { xs: 60, md: 100 },
};

const SummarySection = ({ summary }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const cards = [
    {
      title: "Users",
      icon: <GroupIcon sx={iconStyle} />,
      count: summary.users,
      path: "/dashboard/users",
      backgroundColor: "#FFEB3B",
    },
    {
      title: "Subscriptions",
      icon: <SubscriptionsIcon sx={iconStyle} />,
      count: summary.subscriptions,
      path: "/dashboard/subscriptions",
      backgroundColor: "#4CAF50",
    },
    {
      title: "Courses",
      icon: <LibraryBooksIcon sx={iconStyle} />,
      count: summary.courses,
      path: "/dashboard/courses",
      backgroundColor: "#2196F3",
    },
    {
      title: "Analytics",
      icon: <LeaderboardIcon sx={iconStyle} />,
      count: summary.analytics,
      path: "/dashboard/analytics",
      backgroundColor: "#FF5722",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: 2,
        p: { xs: 3, sm: 0, xl: 0 },
        mt: { xs: 3, sm: 0, xl: 0 },
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          onClick={() => handleNavigation(card.path)}
          sx={{
            ...cardStyles,
            backgroundColor: card.backgroundColor,
          }}
        >
          <CardContent sx={cardContentStyles}>
            <Box>{card.icon}</Box>
            <Typography variant="h4">{card.count}</Typography>
            <Typography variant="h6">{card.title}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

SummarySection.propTypes = {
  summary: PropTypes.shape({
    users: PropTypes.number.isRequired,
    subscriptions: PropTypes.number.isRequired,
    courses: PropTypes.number.isRequired,
    analytics: PropTypes.number.isRequired,
  }).isRequired,
};

export default SummarySection;
