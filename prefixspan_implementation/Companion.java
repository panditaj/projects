

import java.util.HashSet;
/*
 * Pair object consists of a boolean flag showcasing whether the preceding item has an
 * underscore, the current item, hashset of unique sequences which will contain the the
 * list of sequences where that particular pair occurs in the sequence
 * We have overridden the hashcode and the equals function within the Pair object
 * so that always the reference is made to the same pair
 */
public class Companion {

	private boolean isUnderscore;
	Item item;
	HashSet<Integer> uniqueSeq = new HashSet<Integer>();

	@Override
	public int hashCode() {
		StringBuilder sb = new StringBuilder();
		if(isUnderscore){
			sb.append("_");
		}
		else{
			sb.append("b");
		}
		sb.append(item.getItemNo());
		return sb.toString().hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		Companion other = (Companion) obj;
		return this.isUnderscore == other.isUnderscore 
				&& this.item.getItemNo() == other.item.getItemNo();
	}
	
	public boolean isUnderscore() {
		return isUnderscore;
	}
	public void setUnderscore(boolean isUnderscore) {
		this.isUnderscore = isUnderscore;
	}
	public HashSet<Integer> getUniqueSeq() {
		return uniqueSeq;
	}
	public void setUniqueSeq(HashSet<Integer> uniqueSeq) {
		this.uniqueSeq = uniqueSeq;
	}
	public Item getItem() {
		return item;
	}
	public void setItem(Item item) {
		this.item = item;
	}
}
