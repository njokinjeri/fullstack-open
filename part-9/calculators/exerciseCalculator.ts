interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (
    dailyHours: number[],
    target: number
): ExerciseResult => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h > 0).length

    const totalHours = dailyHours.reduce((sum, h) => sum + h, 0)
    const average = totalHours / periodLength;

    const success = average >= target;

    let rating: 1 | 2 | 3;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'excellent target met';
    } else if (average >= target * 0.75) {
        rating = 2
        ratingDescription = 'not bad but could be better'
    } else {
        rating = 1
        ratingDescription = 'you need to train more'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average: Number(average.toFixed(2))
    };
}

if (require.main === module) {
    const parseArguments = (args: string[]): { target: number; dailyHours: number[] } => {
        if (args.length < 4) throw new Error('Not enough arguments')

        const numbers = args.slice(2).map(Number)

        if (numbers.some(isNaN)) {
            throw new Error('Provided values were not numbers')
        }

        const target = numbers[0];
        const dailyHours = numbers.slice(1);

        return { target, dailyHours };
    };

    try {
        const { target, dailyHours } = parseArguments(process.argv);
        const result = calculateExercises(dailyHours, target);
        console.log(result);
    } catch (error: unknown) {
        let message = 'Error: ';
        if (error instanceof Error) {
            message += error.message;
        }
        console.error(message);
    }

}
 
        