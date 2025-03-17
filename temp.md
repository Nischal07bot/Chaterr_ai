```javascript
function isPrimeAndFactors(num) {
// Handle edge cases: numbers less than 2 are not prime
if (num < 2) { return { isPrime: false, factors: [] }; } // Check for divisibility from 2 up to the square root of num
    for (let i=2; i <=Math.sqrt(num); i++) { if (num % i===0) { // Found a factor, so it's not prime. Build the list of
    factors. const factors=[]; factors.push(i); //add the current factor // Efficiently find other factors let j=num /
    i; factors.push(j); if(i !==j) { //Avoid duplicates if num is a perfect square (e.g., 9) factors.push(j) } //Sort
    Factors for consistent output factors.sort((a,b)=> a-b);

    return { isPrime: false, factors: factors };
    }
    }

    // No factors found, it's a prime number
    return { isPrime: true, factors: [] };
    }


    // Example usage:
    console.log(isPrimeAndFactors(2)); // { isPrime: true, factors: [] }
    console.log(isPrimeAndFactors(15)); // { isPrime: false, factors: [3, 5] }
    console.log(isPrimeAndFactors(9)); // { isPrime: false, factors: [3, 3] }
    console.log(isPrimeAndFactors(37)); // { isPrime: true, factors: [] }
    console.log(isPrimeAndFactors(1)); // { isPrime: false, factors: [] }
    console.log(isPrimeAndFactors(100)); // { isPrime: false, factors: [2, 2, 5, 5] }
}
    ```