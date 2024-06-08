"use client"// これがないとエラーになる


import { motion } from 'framer-motion'
interface AnimationProps {
    text: string
}


const AnimationText = ( { text }: AnimationProps ) => {
    return <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.5, delay:1 * 0.05 }} key={1}>{text}
    </motion.div>
}

export default AnimationText