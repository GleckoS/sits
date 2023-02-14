import { motion } from "framer-motion";
import styled from "styled-components";

export const ResultsGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 42px 16px;

    @media (max-width: 1194px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 26px 12px;
    }

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`