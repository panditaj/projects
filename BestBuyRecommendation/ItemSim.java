
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;


public class ItemSim {
	
	private static String TRAINING;
	private static final String COMMA = ",";
	private static Map<String, Map<String, Integer>> mapQueryItemC;			
	private static Map<String, Float> mapQuerySim;
	private static int NUM_VALUES = 5;
	private static int iMap = 0;
	
	private static void initialise(){
		mapQueryItemC = new HashMap<String, Map<String,Integer>>(); 
		mapQuerySim = new HashMap<String, Float>();
	}
	
	public static void calcQueries(String[] args)
	{
		initialise();
		TRAINING = args[0];
		itemQueryCount();
		ProductSimilar.generateProductSimilar(args[2], NUM_VALUES);
		List<String> lstProd = new ArrayList<String>();
		
		try {
			
			BufferedReader bReader = new BufferedReader(new FileReader(args[1]));
			String line =bReader.readLine();
			String[] arrProd;
			String query;
			Iterator<String> it;
			String nearestQMatch;
			Set<String> stProd;
			PrintWriter printer = new PrintWriter(new File(args[3]));
			//printer.println("sku");
			while((line = bReader.readLine()) != null){
				arrProd = line.split(COMMA);
				it = mapQueryItemC.keySet().iterator();				
				while(it.hasNext()){
					query = it.next();
					mapQuerySim.put(query, ProductSimilar.findSimilarity(arrProd[2].replaceAll("\"", "").trim(), query));
				}
				
				mapQuerySim = sortByValues(mapQuerySim);
				
				// Taking the first query after sorting
				Iterator<String> itQueryMatch = mapQuerySim.keySet().iterator();
				nearestQMatch = itQueryMatch.next();
				
				// Fetching the products from the training associated with query
				stProd = mapQueryItemC.get(nearestQMatch).keySet();
				it = stProd.iterator();
				
				if(stProd.size() >= NUM_VALUES)
				{   int i = 0;
					while(i < NUM_VALUES){
						lstProd.add(it.next());
						i++;
					}						
				}
				else
				{
					while(it.hasNext())
						lstProd.add(it.next());
					int leftItems = NUM_VALUES - lstProd.size();
					lstProd = retrieveRemaining(itQueryMatch, lstProd, ProductSimilar.nearestSimilarItems, leftItems);
				}
				
				printer.println(convertToSkus(lstProd));
				
				mapQuerySim = new HashMap<String, Float>();
				lstProd.removeAll(lstProd);
				//System.out.println(count++);
									
			}
			
			bReader.close();
			printer.close();
			
		} catch(Exception e){
			e.printStackTrace();
		}
	}
	
	private static void itemQueryCount()
	{
		try {
			
			BufferedReader bReader = new BufferedReader(new FileReader(TRAINING));
			String line = bReader.readLine();
			String[] arrProd;
			String query;
			String sku;
			Map<String, Integer> mapSku;
			
			while((line = bReader.readLine()) != null){
				arrProd = line.split(COMMA);
				query =arrProd[3].replaceAll("\"", "").trim();
				sku = arrProd[1].replaceAll("\"", "").trim();
				if(!mapQueryItemC.containsKey(query)){
					HashMap<String, Integer> mapSkuC = new HashMap<String, Integer>();
					mapSkuC.put(sku, 1);
					mapQueryItemC.put(query, mapSkuC);
				}
				else
				{
					mapSku = mapQueryItemC.get(query);
					if(mapSku.containsKey(sku))
						mapSku.put(sku, mapSku.get(sku) + 1);
					else
						mapSku.put(sku, 1);
					
					mapQueryItemC.put(query, mapSku);
				}
						
			}
			
			Iterator<String> it = mapQueryItemC.keySet().iterator();
						
			while(it.hasNext()){
				query = it.next();
				mapQueryItemC.put(query, sortByValues(mapQueryItemC.get(query)));
			}
			
			bReader.close();
		} catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	public static <K, V extends Comparable<V>> Map<K, V> sortByValues(final Map<K, V> map) {
	    Comparator<K> valueComparator =  new Comparator<K>() {
	        public int compare(K k1, K k2) {
	            int compare = map.get(k2).compareTo(map.get(k1));
	            if (compare == 0) return 1;
	            else return compare;
	        }
	    };
	    Map<K, V> sortedByValues = new TreeMap<K, V>(valueComparator);
	    sortedByValues.putAll(map);
	    return sortedByValues;
	}
	
	public static List<String> retrieveRemaining(Iterator<String> itQueries, 
			List<String> existing, HashMap<String, Map<String, Float>> nearestItems, int remain)
	{
		while(existing.size() < NUM_VALUES){
			int s = existing.size();
			for(int z = 0; (z < s) && (existing.size() < NUM_VALUES); z++){
				Map<String, Float> nearestItem = nearestItems.get(existing.get(z));
				if(nearestItem != null){
				Iterator<String> it = nearestItem.keySet().iterator();
				String product;
				
				while(it.hasNext() && (iMap < remain)){
					product = it.next();
					if(!existing.contains(product))
					{	iMap++;
						existing.add(product);
					}
				}
				}
			}
			if(iMap < remain){
				existing.add(mapQueryItemC.get(itQueries.next()).keySet().iterator().next());
				iMap++;
			}
			else
				iMap = 0;
		}			
		
		return existing;
	}
	
	private static String convertToSkus(List<String> finalProds)
	{
		StringBuilder sb = new StringBuilder();
		for(int i = 0; i < finalProds.size(); i++)
			sb.append(finalProds.get(i) + ",");
		
		return sb.substring(0, sb.length() - 1).trim();
	}
	

}
