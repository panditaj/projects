

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

public class PrefixImplementation {

	public void generateProjectedDatabase(ArrayList<Sequence> sequences,
			ArrayList<Integer> candidate1, int minSupport) {

		for (Integer c1 : candidate1) {
			ArrayList<Projection> initialProj = new ArrayList<Projection>();
			initialProj = generateInitialProjectionList(sequences);
			//System.out.println("projection database for " + c1);
			ArrayList<Projection> projList = new ArrayList<Projection>();
			projList = getCandidateProjectedDatabase(c1, sequences, initialProj, false);
			//System.out.println(projList.toString());

			getlenKCandidatesForC1(c1, projList, candidate1, sequences,
					minSupport);
		}
	}

	private ArrayList<Projection> generateInitialProjectionList(ArrayList<Sequence> sequences) {
		ArrayList<Projection> initProj = new ArrayList<Projection>();
		for(int i = 0; i < sequences.size(); i++){
			Projection p = new Projection();
			p.setSequenceID(i);
			p.setItemsetID(0);
			p.setItemID(0);
			initProj.add(p);
		}
		return initProj;
	}

	private void getlenKCandidatesForC1(Integer c1,
			ArrayList<Projection> projList, ArrayList<Integer> candidate1,
			ArrayList<Sequence> sequences, int minSupport) {
		Item itm = new Item();
		itm.setItemNo(c1);
		ItemSet its = new ItemSet();
		its.addItem(itm);
		Sequence seq = new Sequence();
		seq.addItemSet(its);
		generateLenKCandidates(candidate1, seq, projList, sequences,
				minSupport);
	}

	private void generateLenKCandidates(
			ArrayList<Integer> candidate1, Sequence c1,
			ArrayList<Projection> projList, ArrayList<Sequence> sequences, int minSupport) {

		HashMap<Companion, Companion> hpp = new HashMap<Companion, Companion>();
		for(Projection prj : projList){
			int seqID = prj.getSequenceID();
			int itemsetID = prj.getItemsetID();
			int itemID = prj.getItemID();
			Sequence seq = sequences.get(seqID);
			int switchItemID = 1;
			for(int i = itemsetID; i < seq.size(); i++){
				ItemSet its = seq.getItemsets().get(i);
				for(int j = switchItemID == 1 ? itemID : 0; j < its.size(); j++){
					Companion pr = new Companion();
					pr.setItem(its.getItems().get(j));
					if(switchItemID == 1 && j != 0 && i == itemsetID){
						pr.setUnderscore(true);
					}
					else{
						pr.setUnderscore(false);
					}
					HashSet<Integer> pairHS = new HashSet<Integer>();
					pairHS.add(seqID);
					pr.setUniqueSeq(pairHS);
					Companion temp = hpp.get(pr);
					if(temp == null){
						hpp.put(pr, pr);
					}
					else{
						HashSet<Integer> tempH = temp.getUniqueSeq();
						tempH.add(seqID);
						temp.setUniqueSeq(tempH);
						hpp.put(temp, temp);
					}
					switchItemID = 0;
				}
			}
		}
		for(Companion p : hpp.keySet()){
			int supportCount = p.getUniqueSeq().size();
			if(supportCount >= minSupport){
				Sequence seq = new Sequence();
				for(ItemSet itsts : c1.getItemsets()){
					ItemSet nIts = new ItemSet();
					for(Item itm : itsts.getItems()){
						Item nIt = new Item(itm.getItemNo());
						nIts.addItem(nIt);
					}
					seq.addItemSet(nIts);
				}
				if(p.isUnderscore()){
					ItemSet its = seq.getItemsets().get(seq.size()-1);
					Item i2 = new Item(p.getItem().getItemNo());
					its.addItem(i2);
					DecimalFormat df = new DecimalFormat("#.######");
					df.setMinimumFractionDigits(6);
					MainPrefixSpan.finalFreqPatterns.put(seq, df.format((double)supportCount/MainPrefixSpan.totalSequencesCount));
					ArrayList<Projection> innerProjList = getCandidateProjectedDatabase(i2.getItemNo(), sequences, projList, p.isUnderscore());
					generateLenKCandidates(candidate1, seq, innerProjList, sequences, minSupport);
				}
				else{
					Item i2 = new Item(p.getItem().getItemNo());
					ItemSet its1 = new ItemSet();
					its1.addItem(i2);
					seq.addItemSet(its1);
					DecimalFormat df = new DecimalFormat("#.######");
					df.setMinimumFractionDigits(6);
					MainPrefixSpan.finalFreqPatterns.put(seq, df.format((double)supportCount/MainPrefixSpan.totalSequencesCount));
					ArrayList<Projection> innerProjList = getCandidateProjectedDatabase(i2.getItemNo(), sequences, projList, p.isUnderscore());
					generateLenKCandidates(candidate1, seq, innerProjList, sequences, minSupport);
				}
			}
		}
	}

	private ArrayList<Projection> getCandidateProjectedDatabase(Integer c1,
			ArrayList<Sequence> sequences, ArrayList<Projection> initList, boolean underScoreFlag) {
		ArrayList<Projection> projList = new ArrayList<Projection>();
		nextProj: for(Projection p : initList){
			Projection newP = null;
			int seqID = p.getSequenceID();
			int itemsetID = p.getItemsetID();
			int itemID = p.getItemID();
			Sequence seq = sequences.get(seqID);
			int switchItemID = 1;
			for(int i = itemsetID; i < seq.size(); i++){
				ItemSet its = seq.getItemsets().get(i);
				for(int j = switchItemID == 1 ? itemID : 0; j < its.size(); j++){
					if(its.getItems().get(j).getItemNo() == c1){
						newP = new Projection();
						if(underScoreFlag == (i == itemsetID && j == itemID && j != 0)){
							if(underScoreFlag == true && (i == itemsetID && j == itemID && j != 0) == true){
								for(int x = j+1; x < its.size(); x++){
									Projection pr = new Projection(seqID, itemsetID, x);
									projList.add(pr);
								}
							}
							if(j == its.size() - 1 && i == seq.size() - 1){
								continue nextProj;
							}
							else if(j == its.size() - 1 && i != seq.size() - 1){
								newP.setSequenceID(seqID);
								newP.setItemsetID(i + 1);
								newP.setItemID(0);
								projList.add(newP);
							}
							else{
								newP.setSequenceID(seqID);
								newP.setItemsetID(i);
								newP.setItemID(j + 1);
								projList.add(newP);
							}
						}
					}
					switchItemID = 0;
				}
			}
		}
		return projList;
	}
}
