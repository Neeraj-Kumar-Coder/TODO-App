export const containerVariant = {
    hidden: {},
    visible: {
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.15
        }
    }
}

export const slideInFromLeftVariant = {
    hidden: {
        x: '-100vw'
    },
    visible: {
        x: 0,
        transition: {
            when: "beforeChildren",
            type: 'tween',
            duration: 0.5,
            staggerChildren: 0.3
        }
    }
}

export const fadeSlideInFromLeftVariant = {
    hidden: {
        opacity: 0,
        x: -30
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            duration: 0.3,
            staggerChildren: 0.15
        }
    }
}

export const riseUpVariant = {
    hidden: {
        opacity: 0,
        y: 15
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

export const sinkDownVariant = {
    hidden: {
        opacity: 0,
        y: -30
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

export const fadeInVariant = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    },
    exit: {
        opacity: 0
    }
}

export const toastVariant = {
    hidden: {
        left: "50%",
        x: -1000,
    },
    visible: {
        left: "50%",
        x: "-50%",
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15
        }
    },
    exit: {
        left: "50%",
        x: 1000,
        opacity: 0
    }
}

export const modalVariant = {
    hidden: {
        left: "50%",
        right: "50%",
        x: "-50%",
        y: -100
    },
    visible: {
        left: "50%",
        right: "50%",
        x: "-50%",
        y: "-50%",
        transition: {
            type: "tween"
        }
    },
    exit: {
        left: "50%",
        right: "50%",
        y: -500,
        opacity: 0
    }
}