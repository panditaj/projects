############################### ALGORITHM ########################################

##// P is the set of all pages; |P| = N
##// S is the set of sink nodes, i.e., pages that have no out links
##// M(p) is the set of pages that link to page p
##// L(q) is the number of out-links from page q
##// d is the PageRank damping/teleportation factor; use d = 0.85 as is typical
##
##foreach page p in P
##  PR(p) = 1/N                          /* initial value */
##
##while PageRank has not converged do
##  sinkPR = 0
##  foreach page p in S                  /* calculate total sink PR */
##    sinkPR += PR(p)
##  foreach page p in P
##    newPR(p) = (1-d)/N                 /* teleportation */
##    newPR(p) += d*sinkPR/N             /* spread remaining sink PR evenly */
##    foreach page q in M(p)             /* pages pointing to p */
##      newPR(p) += d*PR(q)/L(q)         /* add share of PageRank from in-links */
##  foreach page p
##    PR(p) = newPR(p)
##
##return PR

############################### IMPLEMENTATIAON ########################################

# Importing the math library
import math

# taking the sample graph as input
input_file = "simple-in-links.txt"

# defining dictionary M which is a combination of a page and set of pages that link to that page
M = {}

# defining dictionart L which is a combination of a page and number of outlinks the page has
L = {}

# defining list P which is a list of all the nodes in the graph
P = []

# defining list S which is a list of sink nodes (nodes which 0 outlinks)
S = []

# defining list page_rank which stores the page rank of the pages
page_rank = {}

# defining dictionary which stores the page and the no of inlinks to the page
rank_inlinks = {}
count = []

##################################################################################

#populating all the data structures with the required values which will be used for computing the Page Rank
def initialize_lists_with_data (get_input_from_file, in_links_set, out_links_count, Pages, sink_nodes):
    get_input_from_file = open(input_file, "r")
    for eachline in get_input_from_file:
        eachline = eachline.strip()
        nodes = eachline.split(" ")
        page = nodes[0]
        Pages.append(page)                              # initialized P with list of nodes
        in_links_set[page] = tuple(nodes[1:])           # initialized M with page and its links

#    print "Page List = ", Pages
    print "<Page: Links connected> = \n", in_links_set

    for key,value in M.iteritems ():
        for node in value:
            temp = 1
            if node in out_links_count:
                temp = out_links_count[node]
                temp += 1
            out_links_count[node] = temp                # initialized L with page and no of outgoing links

    print "\n<Page: OutLink Count> = ", out_links_count

    for value in Pages:
        if value not in out_links_count:                # checking whether the Value field of the dictionary is blank?
            sink_nodes.append(value)                    # if yes add to list of sink nodes

#    print "Sink Nodes = ", sink_nodes
    print "\nInitialization Completed Successfully"

##################################################################################

def get_page_rank (page_rank, P, L, S, M, d, N, no_of_iterations):

    k = 1/float(N)
    print "N = ", N
    for p in P:
        page_rank[p] = k                  # initial value
#    print "Initial Page Rank = ", page_rank
    
    new_page_rank = {}
    prev_perplexity = 0.0
    i = 0
    j = 0
    print "\nPrinting Perplexity Values till it converges:"
    while i < no_of_iterations:
        perplexity = get_perplexity(page_rank)
        if abs (int(perplexity) - int(prev_perplexity)) == 0:
            j += 1
        else:
            j = 1
        if j == 5:
            break
        prev_perplexity = perplexity
        print "Perplexity = ", prev_perplexity
        sinkPR = 0
        for s in S:
            sinkPR += page_rank[s]         # calculating total sink PR
        #print "sinkPR = ", sinkPR 
        for p in P:
            new_page_rank[p] = (1-d)/N + d*sinkPR/N
            for q in M[p]:
                new_page_rank[p] += d*page_rank[q]/float(L[q])
        for p in P:
           page_rank[p] = new_page_rank[p]
           #print "page rank = " , page_rank[p]
        i += 1

    print "Page-Rank Calculation Completed Successfully"
    return page_rank
            
################################################################################

#calculating the perplexity value based on the given formula
def get_perplexity(page_rank):
    check_convergence = False

    perplexity_value = 0
    entropy_value = 0

    for rank in page_rank.values():
        if rank != 0:
            entropy_value += rank*math.log(1/float(rank),2)

    perplexity_value = pow(2, entropy_value)
    return perplexity_value
 
################################################################################

#printing the top 50 pageranks
def printing_top_pageranks(final_page_rank):
    # Sorting the list by the Page Rank 
    print "\nPrinting top page ranks"
    i = 0
    for key, value in sorted(final_page_rank.iteritems(), key = lambda (k,v): (v,k), reverse = True):
        if i == 50:
            break
        else:
            print "%s: %f" % (key, value)
        i += 1

####################################################################################

#printing the top 50 pages with inlinks
def printing_top_inlinks(M):
    keys_list = []
    in_links_count = []
    res = []

    key_list = list (M.keys())
    in_links_count = list (M.values())

    for s in in_links_count:
        res.append (len(s))

    rank_inlinks = dict(zip(key_list,res))
    #print count
    print "\nPrinting top pages with inlinks"
    p = 0
    for key, value in sorted(rank_inlinks.iteritems(),key=lambda (k,v): (v,k), reverse=True):
        if p==50:
            break
        else:
            print "%s: %d" % (key,value)
        p += 1

####################################################################################

# Calling the initialize function for filling the data structure with the required values
initialize_lists_with_data (input_file, M,L,P,S)

# calculating the number of pages 
N = len (P)

# d is the PageRank damping/teleportation factor; use d = 0.85 as is typical
d = 0.85

#setting up the number of iterations
no_of_iterations = 100

# calculating the final page rank after passing the no of iterations as last parameter
final_page_rank = get_page_rank (page_rank, P, L, S, M, d, N, no_of_iterations)

#printing the top 50 pages by rank
printing_top_pageranks(final_page_rank)

#printing the top 50 pages by number in-links
printing_top_inlinks(M)

####################################################################################


    

    




