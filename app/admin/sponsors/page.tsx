"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SponsorLead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'REJECTED';
  createdAt: string;
  budget: number;
  logoUrl: string;
  brandGuidelinesUrl: string;
}

export default function SponsorsPage() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<SponsorLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<SponsorLead | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/sponsors');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch sponsor leads",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/sponsors/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update status');

      toast({
        title: "Success",
        description: "Lead status updated successfully"
      });

      // Update local state
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus as any } : lead
      ));
      setShowDetailsDialog(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to update lead status",
        variant: "destructive"
      });
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSearch = 
      lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sponsor Applications</h1>
          <p className="text-muted-foreground">
            Review and manage sponsor applications
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company or contact..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="QUALIFIED">Qualified</SelectItem>
            <SelectItem value="CONVERTED">Converted</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{formatDate(lead.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {lead.logoUrl && (
                      <div className="w-8 h-8 rounded overflow-hidden">
                        <img 
                          src={lead.logoUrl} 
                          alt={`${lead.companyName} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <span>{lead.companyName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>{lead.contactName}</div>
                  <div className="text-sm text-muted-foreground">{lead.email}</div>
                </TableCell>
                <TableCell>{formatBudget(lead.budget)}</TableCell>
                <TableCell>
                  <Badge variant={lead.status === 'REJECTED' ? 'destructive' : 'secondary'}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedLead(lead);
                      setShowDetailsDialog(true);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sponsor Application Details</DialogTitle>
            <DialogDescription>
              Review and manage sponsorship application
            </DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <p className="text-lg">{selectedLead.companyName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Submission Date</label>
                  <p className="text-lg">{formatDate(selectedLead.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Contact Name</label>
                  <p className="text-lg">{selectedLead.contactName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Contact Email</label>
                  <p className="text-lg">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-lg">{selectedLead.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Budget</label>
                  <p className="text-lg">{formatBudget(selectedLead.budget)}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <p className="mt-1 text-muted-foreground whitespace-pre-wrap">
                  {selectedLead.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Logo</label>
                  {selectedLead.logoUrl ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                      <img 
                        src={selectedLead.logoUrl} 
                        alt="Company Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg border flex items-center justify-center">
                      <p className="text-muted-foreground">No logo provided</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Brand Guidelines</label>
                  {selectedLead.brandGuidelinesUrl ? (
                    <Button variant="outline" className="w-full" asChild>
                      <a 
                        href={selectedLead.brandGuidelinesUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Image className="h-4 w-4 mr-2" />
                        View Guidelines
                      </a>
                    </Button>
                  ) : (
                    <div className="aspect-video rounded-lg border flex items-center justify-center">
                      <p className="text-muted-foreground">No guidelines provided</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-medium mb-2 block">Update Status</label>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => updateLeadStatus(selectedLead.id, 'CONTACTED')}
                  >
                    Mark Contacted
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => updateLeadStatus(selectedLead.id, 'QUALIFIED')}
                  >
                    Mark Qualified
                  </Button>
                  <Button 
                    onClick={() => updateLeadStatus(selectedLead.id, 'CONVERTED')}
                  >
                    Mark Converted
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => updateLeadStatus(selectedLead.id, 'REJECTED')}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}