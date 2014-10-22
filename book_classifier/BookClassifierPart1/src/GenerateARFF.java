import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GenerateARFF {
	
	/*
	 * Main function for generating ARFF files required as input to our
	 * model classifier.
	 * This function generates a train ARFF and a test ARFF files from the input1.txt
	 * and input2.txt file provided as input
	 */
	public void generateARFF(String inputFile) {
		FileReader fReader;
		BufferedReader bReader;
		FileWriter fWriter;
		BufferedWriter bWriter = null;
		HashSet<String> category = new HashSet<String>();
		HashSet<String> trainBookID = new HashSet<String>();
		HashSet<String> testBookID = new HashSet<String>();
		try{
			fReader = new FileReader(inputFile);
			bReader = new BufferedReader(fReader);
			//generating ARFF file for training data
			fWriter = new FileWriter(GlobalMembers.trainTemp);
			bWriter = new BufferedWriter(fWriter);
			String line = bReader.readLine();
			String[] lineArray = line.split("\t");
			//finding the number of rows to scan in input.txt
			Pattern p = Pattern.compile("(\\d+)");
			Matcher m = p.matcher(lineArray[0]);
			int numOfRowsTrain = 0;
			if (m.find()) {
				numOfRowsTrain = Integer.valueOf(m.group(1));
			}
			int i = 1;
			while(i <= numOfRowsTrain){
				line = bReader.readLine();
				String[] arr = line.split("\t");
				bWriter.write("\""+arr[2].toString()+"\"");
				bWriter.write(",");
				bWriter.write("\""+arr[1].toString()+"\"");
				bWriter.write(",");
				bWriter.write("\""+arr[0].toString()+"\"");
				bWriter.write("\n");
				category.add(arr[0]);
				trainBookID.add(arr[1]);
				i++;
			}
			bWriter.close();
			fWriter.close();
			finalizeARFF(GlobalMembers.trainTemp, category, trainBookID, 1, GlobalMembers.train);
			
			//generating ARFF file for test data
			fWriter = new FileWriter(GlobalMembers.testTemp);
			bWriter = new BufferedWriter(fWriter);
			line = bReader.readLine();
			lineArray = line.split("\t");
			Pattern p1 = Pattern.compile("(\\d+)");
			Matcher m1 = p1.matcher(lineArray[0]);
			int numOfRowsTest = 0;
			if (m1.find()) {
				numOfRowsTest = Integer.valueOf(m1.group(1));
			}
			int j = 1;
			while(j <= numOfRowsTest){
				line = bReader.readLine();
				String[] arr = line.split("\t");
				bWriter.write("\""+arr[1].toString()+"\"");
				bWriter.write(",");
				bWriter.write("\""+arr[0].toString()+"\"");
				bWriter.write(",");
				bWriter.write("\""+"BIOLOGY"+"\"");
				bWriter.write("\n");
				testBookID.add(arr[0]);
				j++;
			}
			bWriter.close();
			fWriter.close();
			finalizeARFF(GlobalMembers.testTemp, category, testBookID, 1, GlobalMembers.test);
			
			bReader.close();
			fReader.close();
		}
		catch(IOException exp){
			exp.printStackTrace();
		}
		catch(Exception exp){
			exp.printStackTrace();
		}
	}

	/*
	 * Function for using intermediate files for actually generating the ARFF file
	 * which will be directly given as input to our classifier
	 */
	private void finalizeARFF(String input, HashSet<String> category, HashSet<String> bookID, int flag, String output) {
		try{
			FileReader fReader = new FileReader(input);
			BufferedReader bReader = new BufferedReader(fReader);
			FileWriter fWriter = new FileWriter(output);
			BufferedWriter bWriter = new BufferedWriter(fWriter);
			bWriter.write("@relation booksClassification");
			bWriter.write("\n");
			bWriter.write("@attribute Name string");
			bWriter.write("\n");
			bWriter.write("@attribute BookID string");
			bWriter.write("\n");
			if(flag == 1){
				bWriter.write("@attribute Class {");
				bWriter.write(writeCategories(category));
				bWriter.write("}");
				bWriter.write("\n");
			}
			bWriter.write("@data");
			bWriter.write("\n");
			String line = null;
			while((line = bReader.readLine()) != null){
				bWriter.write(line);
				bWriter.write("\n");
			}
			bWriter.flush();
			bReader.close();
			fReader.close();
			bWriter.close();
			fWriter.close();
		}
		catch(Exception exp){
			exp.printStackTrace();
		}
	}

	/*
	 * Function for writing categories available to the ARFF file
	 */
	private static String writeCategories(HashSet<String> category) {
		StringBuilder sb = new StringBuilder();
		for(String s : category){
			sb.append("'"+s+"'");
			sb.append(",");
		}
		return sb.toString();
	}

}