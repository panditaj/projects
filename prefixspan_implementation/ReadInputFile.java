

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.io.FileReader;
import java.io.BufferedReader;

public class ReadInputFile {

	public ArrayList<Sequence> getSequences(String file,
			HashMap<Integer, Integer> itemWithMinSupport, int minSupport) {
		ArrayList<Sequence> seq = new ArrayList<Sequence>();
		seq = readFile(file, itemWithMinSupport, minSupport);
		return seq;
	}

	public ArrayList<Sequence> readFile(String file,
			HashMap<Integer, Integer> itemWithMinSupport, int minSupport) {
		ArrayList<Sequence> s = new ArrayList<Sequence>();
		try {
			FileReader fr = new FileReader(file);
			BufferedReader br = new BufferedReader(fr);
			String line = null;
			while ((line = br.readLine()) != null) {
				Sequence seq = new Sequence();
				int i = 1;
				String[] splitItems = line.split(" ");
				// int eventsCount = Integer.parseInt(splitItems[0]);
				while (i < splitItems.length) {
					ItemSet items = new ItemSet();
					int itemSetCount = Integer.parseInt(splitItems[i++]);
					for (int j = 0; j < itemSetCount; j++) {
						int itemVal = Integer.parseInt(splitItems[i++]);
						if (itemWithMinSupport.get(itemVal) < minSupport) {
							continue;
						}
						Item it = new Item();
						it.setItemNo(itemVal);
						items.addItem(it);
					}
					if (items.size() > 0)
						seq.addItemSet(items);
				}
				s.add(seq);
			}
			br.close();
			fr.close();
		} catch (Exception exp) {
			exp.printStackTrace();
		}
		return s;
	}

	public HashMap<Integer, Integer> getitemWithSupport(
			HashMap<Integer, Integer> itemWithMinSupport, String file) {
		FileReader fr;
		BufferedReader br;
		try {
			fr = new FileReader(file);
			br = new BufferedReader(fr);
			String line = null;
			while ((line = br.readLine()) != null) {
				MainPrefixSpan.totalSequencesCount++;
				int i = 1;
				String[] splitItems = line.split(" ");
				HashSet<Integer> hs = new HashSet<Integer>();
				while (i < splitItems.length) {
					int itemSetCount = Integer.parseInt(splitItems[i++]);
					for (int j = 0; j < itemSetCount; j++) {
						hs.add(Integer.parseInt(splitItems[i++]));
					}
				}
				for (Integer item : hs) {
					if (itemWithMinSupport.containsKey(item)) {
						itemWithMinSupport.put(item,
								itemWithMinSupport.get(item) + 1);
					} else {
						itemWithMinSupport.put(item, 1);
					}
				}
			}
			br.close();
			fr.close();
		} catch (Exception exp) {
			exp.printStackTrace();
		}
		return itemWithMinSupport;
	}
}
