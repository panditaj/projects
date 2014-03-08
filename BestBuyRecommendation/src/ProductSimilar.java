

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class ProductSimilar {

	public static HashMap<String, String> allProducts;
	private static final String COMMA = ",";
	public static HashMap<String, Map<String, Float>> nearestSimilarItems;

	private static void initialize()
	{
		allProducts = new HashMap<String, String>();
		nearestSimilarItems = new HashMap<String, Map<String, Float>>();
	}
	
	public static void generateProductSimilar(String fileName, int num) {
		try {
			
			initialize();
			BufferedReader bReader = new BufferedReader(
					new FileReader(fileName));
			String line = bReader.readLine();
			String[] arrProd;

			while ((line = bReader.readLine()) != null) {
				arrProd = line.split(COMMA);
				allProducts.put(arrProd[2], arrProd[0]);
			}

			bReader.close();

			Object[] arrProdName = allProducts.keySet().toArray();
			arrProd = new String[arrProdName.length];
			Map<String, Float> prodSimilar;
			float sim;

			for (int i = 0; i < arrProdName.length; i++)
				arrProd[i] = (String) arrProdName[i];

			for (int i = 0; i < arrProdName.length; i++) {
				prodSimilar = new HashMap<String, Float>();

				for (int j = 0; j < arrProd.length; j++) {
					if (i != j)
						if ((sim = findSimilarity(arrProd[i], arrProd[j])) >= 0.6f)
							prodSimilar.put(allProducts.get(arrProd[j])
									.toString(), sim);
				}

				prodSimilar = sortByValues(prodSimilar);

				nearestSimilarItems.put(allProducts.get(arrProd[i]).toString(),
						prodSimilar);
			}
			/*
			 * Iterator<String> it = nearestSimilarItems.keySet().iterator();
			 * Iterator<String> itInside; String prodName; PrintWriter printer =
			 * new PrintWriter(new File(OUTPUT_FILE));
			 * 
			 * while(it.hasNext()){ prodName = it.next(); itInside =
			 * nearestSimilarItems.get(prodName).keySet().iterator(); int i = 0;
			 * StringBuilder sb = new StringBuilder(); while( (i < num) &&
			 * itInside.hasNext()){ sb.append(itInside.next() + COMMA); i++; }
			 * 
			 * printer.println(prodName + " : " + sb.substring(0, sb.length() -
			 * 1));
			 * 
			 * }
			 * 
			 * printer.close();
			 */

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static float findSimilarity(String first, String second) {
		List<String> lstCommonChar1 = getCommonCharacters(first, second);
		List<String> lstCommonChar2 = getCommonCharacters(first, second);

		// check for zero in common
		if (lstCommonChar1.size() == 0 || lstCommonChar2.size() == 0
				|| lstCommonChar1.size() != lstCommonChar2.size()) {
			return 0.0f;
		}

		// get the number of transpositions
		int transpositions = 0;
		int n = lstCommonChar1.size();
		for (int i = 0; i < n; i++) {
			if (!lstCommonChar1.get(i).equals(lstCommonChar2.get(i)))
				transpositions++;
		}
		transpositions /= 2.0f;

		// calculate jaro metric
		return (n / ((float) first.length()) + n / ((float) second.length()) + (n - transpositions)
				/ ((float) n)) / 3.0f;
	}

	private static List<String> getCommonCharacters(String string1,
			String string2) {

		List<String> lstReturnCommons = new ArrayList<String>();

		HashMap<String, Integer> unique = new HashMap<String, Integer>();

		char[] char1 = string1.toCharArray();
		char[] char2 = string2.toCharArray();

		boolean bCheck;
		String subString;

		for (int i = 0; i < char1.length; i++) {
			bCheck = true;
			for (int j = 0; j < char2.length && bCheck; j++) {
				if (unique.containsKey(char1[i] + "")) {
					bCheck = false;
					int numberofchecks = unique.get(char1[i] + "");
					int start = 0;
					subString = string2;
					for (int z = 0; z < numberofchecks; z++) {
						start = subString.indexOf(char1[i]);
						subString = subString.substring(start + 1);
					}

					if (subString.contains(char1[i] + "")) {
						unique.put(char1[i] + "",
								(unique.get(char1[i] + "") + 1));
						lstReturnCommons.add(char1[i] + "");
					}
				} else if (char1[i] == char2[j]) {
					bCheck = false;
					unique.put(char1[i] + "", 1);
					lstReturnCommons.add(char1[i] + "");
				}
			}
		}

		return lstReturnCommons;
	}

	public static <K, V extends Comparable<V>> Map<K, V> sortByValues(
			final Map<K, V> map) {
		Comparator<K> valueComparator = new Comparator<K>() {
			public int compare(K k1, K k2) {
				int compare = map.get(k2).compareTo(map.get(k1));
				if (compare == 0)
					return 1;
				else
					return compare;
			}
		};
		Map<K, V> sortedByValues = new TreeMap<K, V>(valueComparator);
		sortedByValues.putAll(map);
		return sortedByValues;
	}

}
