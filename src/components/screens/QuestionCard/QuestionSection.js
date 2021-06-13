import React from 'react'
import QuestionCard from './QuestionCard'

const questions = [
    {
        id: 1,
        isBookmarked: false,
        question: 'This is like Question no. 3 and this is Question no, believe it or not but it is ',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 2,
        isBookmarked: false,
        question: 'This is like Question no. 4 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 3,
        isBookmarked: false,
        question: 'This is like Question no. 5 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 4,
        isBookmarked: false,
        question: 'This is like Question no. 6 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 5,
        isBookmarked: false,
        question: 'This is like Question no. 7 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 6,
        isBookmarked: false,
        question: 'This is like Question no. 8 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 7,
        isBookmarked: false,
        question: 'This is like Question no. 9 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 8,
        isBookmarked: true,
        question: 'This is like Question no. 10 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 9,
        isBookmarked: false,
        question: 'This is like Question no. 11 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 10,
        isBookmarked: false,
        question: 'This is like Question no. 12 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 11,
        isBookmarked: false,
        question: 'This is like Question no. 13 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 12,
        isBookmarked: false,
        question: 'This is like Question no. 14 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 13,
        isBookmarked: false,
        question: 'This is like Question no. 15 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 14,
        isBookmarked: true,
        question: 'This is like Question no. 16 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 15,
        isBookmarked: false,
        question: 'This is like Question no. 17 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 16,
        isBookmarked: false,
        question: 'This is like Question no. 18 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 17,
        isBookmarked: false,
        question: 'This is like Question no. 19 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 18,
        isBookmarked: false,
        question: 'This is like Question no. 18 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 19,
        isBookmarked: false,
        question: 'This is like Question no. 19 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 20,
        isBookmarked: false,
        question: 'This is like Question no. 20 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 21,
        isBookmarked: false,
        question: 'This is like Question no. 21 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 22,
        isBookmarked: false,
        question: 'This is like Question no. 22 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 23,
        isBookmarked: false,
        question: 'This is like Question no. 23 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 24,
        isBookmarked: false,
        question: 'This is like Question no. 24 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
    {
        id: 25,
        isBookmarked: false,
        question: 'This is like Question no. 25 and this is Question no, believe it or not but it is',
        options: [
            {
                id: 1,
                value: 'first option',
            },
            {
                id: 2,
                value: 'second option'
            },
            {
                id: 3,
                value: 'third option'
            },
            {
                id: 4,
                value: 'fourth option'
            }
        ]
    },
]

const QuestionSection = () => {

    return (
        <>
            <QuestionCard questions={questions} />
        </>
    )
}

export default QuestionSection
