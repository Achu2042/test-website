import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Section {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  sortOrder: number;
}

interface SubSection {
  id: number;
  sectionId: number;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  sortOrder: number;
}

export default function HierarchicalNavigation() {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const { data: sections = [], isLoading: sectionsLoading } = useQuery({
    queryKey: ["/api/sections"],
  });

  const { data: subSections = [] } = useQuery({
    queryKey: ["/api/sub-sections"],
  });

  const toggleSection = (sectionId: number) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const getSectionSubSections = (sectionId: number) => {
    return (subSections as SubSection[]).filter((sub: SubSection) => sub.sectionId === sectionId)
      .sort((a: SubSection, b: SubSection) => a.sortOrder - b.sortOrder);
  };

  if (sectionsLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-navigation-title">
          Our Solutions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive range of smart home automation solutions
        </p>
      </div>

      <div className="grid gap-6">
        {(sections as Section[])
          .sort((a: Section, b: Section) => a.sortOrder - b.sortOrder)
          .map((section: Section) => {
            const sectionSubSections = getSectionSubSections(section.id);
            const isOpen = openSections.has(section.id);

            return (
              <Card key={section.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleSection(section.id)}
                      data-testid={`section-trigger-${section.slug}`}
                    >
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {section.imageUrl && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden">
                                <img
                                  src={section.imageUrl}
                                  alt={section.name}
                                  className="w-full h-full object-cover"
                                  data-testid={`img-section-${section.slug}`}
                                />
                              </div>
                            )}
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {section.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mt-1">
                                {section.description}
                              </p>
                              <div className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                                {sectionSubSections.length} sub-category{sectionSubSections.length !== 1 ? 'ies' : 'y'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isOpen ? (
                              <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-200" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden transition-all duration-300">
                    <div className="p-6 bg-white dark:bg-gray-900">
                      <div className="grid md:grid-cols-2 gap-4">
                        {sectionSubSections.map((subSection: SubSection) => (
                          <Card 
                            key={subSection.id} 
                            className="group hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                {subSection.imageUrl && (
                                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                    <img
                                      src={subSection.imageUrl}
                                      alt={subSection.name}
                                      className="w-full h-full object-cover"
                                      data-testid={`img-subsection-${subSection.slug}`}
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                    {subSection.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                                    {subSection.description}
                                  </p>
                                  <div className="flex items-center justify-between mt-3">
                                    <Link
                                      href={`/sections/${section.slug}/${subSection.slug}`}
                                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                      data-testid={`link-subsection-${subSection.slug}`}
                                    >
                                      Learn More
                                      <ArrowRight className="w-3 h-3 ml-1" />
                                    </Link>
                                    <Link href={`/products?subSection=${subSection.id}`}>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="text-xs"
                                        data-testid={`button-products-${subSection.slug}`}
                                      >
                                        View Products
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {sectionSubSections.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <p>No sub-categories available for this section.</p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
      </div>
    </div>
  );
}