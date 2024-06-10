import java.util.*;
public class Main {
    public static String determineWinner(int[] sequence) {
        int evenCount = 0, oddCount = 0; 
        for (int num : sequence) {
            if (num % 2 == 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }

        if ((oddCount % 4 == 1 && evenCount % 2 == 0) || oddCount % 4 == 2) {
            return "Bob";
        }

        return "Alice";
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter sequence length:");
        int n = scanner.nextInt(); 
        int[] sequence = new int[n]; 
        System.out.println("Enter sequence:");
        for (int j = 0; j < n; j++) {
             sequence[j] = scanner.nextInt(); 
        }
        String winner = determineWinner(sequence);
        System.out.println(winner);
    }
}
//Time complexity of above code : O(n) -- for iterating over the sequence of length 'n'
// Space complexity of above code O(n) -- for storing the sequence of length 'n'