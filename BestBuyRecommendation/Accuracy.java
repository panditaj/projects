

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;

public class Accuracy {

	// private static final String input = "xbox/queryItemAnswers.csv";
	private static final String OUTPUT_EXP = "xbox/actual.csv";

	public void accurate(String algo , String input) {

		try {
			BufferedReader bEvalReader = new BufferedReader(new FileReader(input));
			BufferedReader bExpReader = new BufferedReader(new FileReader(OUTPUT_EXP));
			String expectedSku;
			HashSet<String> allSKUs = new HashSet<String>();
			String line;
			String[] arrSku;
			int countTotal = 0;
			int countCorrect = 0;
			while ((line = bEvalReader.readLine()) != null) {
				expectedSku = bExpReader.readLine();
				arrSku = line.split(",");

				for (int i = 0; i < arrSku.length; i++)
					allSKUs.add(arrSku[i]);

				if (allSKUs.contains(expectedSku))
					countCorrect++;

				countTotal++;

				allSKUs = new HashSet<String>();

			}

			/*System.out.println("Total number of entries : " + countTotal);
			System.out.println("Total number of correct entries : "
					+ countCorrect);
*/
			System.out.println("Accuracy of correctness for " + algo + " "  
					+ ((float) countCorrect) / countTotal);

			bEvalReader.close();
			bExpReader.close();

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
