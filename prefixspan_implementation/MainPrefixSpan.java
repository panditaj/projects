

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.ObjectInputStream.GetField;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MainPrefixSpan {

	public static HashMap<Sequence, String> finalFreqPatterns = new HashMap<Sequence, String>();
	public static int totalSequencesCount = 0;
	public static void main(String[] args) {
		long startTime = System.currentTimeMillis();
		ReadInputFile input = new ReadInputFile();
		String file = args[0];
		float relSupport = Float.parseFloat(args[1]);
		String outputFile = args[2];
		/*
		 * HashMap for storing the Item: Support Count for all Items in Database
		 * Calling function getItemWithSupport
		 * @param: empty HashMap, file
		 * Obtained a HashMap with Item: Support Count
		 */ 
		HashMap<Integer, Integer> itemWithMinSupport = new HashMap<Integer, Integer>();
		itemWithMinSupport = input.getitemWithSupport(itemWithMinSupport, file);
		int minSupport = (int)(relSupport * MainPrefixSpan.totalSequencesCount);

		/*
		 * Creating an ArrayList of empty Sequences
		 * Calling method getSequences
		 * @param: file, minimum support, HashMap containing Item: Support count
		 */
		ArrayList<Sequence> sequences = new ArrayList<Sequence>();
		sequences = input.getSequences(file, itemWithMinSupport, minSupport);
		
		//printSequences(sequences);
	
		/*
		 * Creating an empty ArrayList for storing the Items satisfy the minimum support criteria
		 * Iterating over the HashMap(Item: Count) and using minSupport to filter 
		 * non-frequent items from the HashMap
		 */
		ArrayList<Integer> candidate1 = new ArrayList<Integer>();
		for(Map.Entry<Integer, Integer> entry : itemWithMinSupport.entrySet()){
			if(entry.getValue() >= minSupport){
				candidate1.add(entry.getKey());
				Item it = new Item(entry.getKey());
				ItemSet its = new ItemSet();
				its.addItem(it);
				Sequence seq = new Sequence();
				seq.addItemSet(its);
				DecimalFormat df = new DecimalFormat("#.######");
				df.setMinimumFractionDigits(6);
				MainPrefixSpan.finalFreqPatterns.put(seq, df.format((double)entry.getValue()/MainPrefixSpan.totalSequencesCount));
			}
		}
		
		PrefixImplementation pi = new PrefixImplementation();
		pi.generateProjectedDatabase(sequences, candidate1, minSupport);
		
		try{
			FileWriter fWriter = new FileWriter(outputFile);
			BufferedWriter bWriter = new BufferedWriter(fWriter);
			//bWriter.write("Number of Frequent Patterns = " +MainPrefixSpan.finalFreqPatterns.size());
			//bWriter.write("\n");
			
			for(Map.Entry<Sequence, String> entry : MainPrefixSpan.finalFreqPatterns.entrySet()){
				Sequence seq = entry.getKey();
				bWriter.write(seq.displaySequence());
				bWriter.write(": ");
				bWriter.write(entry.getValue());
				bWriter.write("\n");
			}
			bWriter.close();
			fWriter.close();
		}
		catch(Exception exp){
			exp.printStackTrace();
		}
		
		long endTime = System.currentTimeMillis();
		System.out.println("It took " + ((endTime - startTime)/1000) + " seconds");
	}

	private static void printSequences(ArrayList<Sequence> sequences) {
		System.out.println("printing sequence database");
		for(Sequence seq : sequences){
			System.out.println(seq.displaySequence());
		}

		
	}
}
