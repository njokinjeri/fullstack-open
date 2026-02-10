export const calculateBmi = (weight:number, height: number): string => {
    const bmi =  weight / (height * height) * 10000;

    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal (healthy Weight)';
    if (bmi < 30) return 'Overweight'
    return 'Obese';
}

if (require.main === module) {
    try {
        const weight: number = Number(process.argv[2]);
        const height: number = Number(process.argv[3]);

        if (isNaN(weight) || isNaN(height)) {
            throw new Error('malformatted parameters');
        }

        const result = calculateBmi(weight, height);
        console.log(result);

    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: '
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage)
    }
}





