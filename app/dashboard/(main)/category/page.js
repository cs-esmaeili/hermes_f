'use client';
import { useState, useEffect, useRef } from 'react';
import Cytoscape from 'cytoscape';
import { categoryList as RcategoryList } from '@/services/Category';
import toast from 'react-hot-toast';
import translation from "@/translation/translation";
import CreateCategory from '@/components/dashboard/category/Create';
import { updateCategory as RupdateCategory } from '@/services/Category';

export default function Category({ selectListener, pickMode = false }) {
    const [categorys, setCategorys] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong']);
    const cyRef = useRef(null);
    const [addEdgeMode, setAddEdgeMode] = useState(false);

    const addEdgeModeRef = useRef(addEdgeMode);

    const updateCategory = async (child, parent, name) => {
        try {
            const { data } = await RupdateCategory({ child, parent, name });
            const { message } = data;
            toast.success(message);
            setSelectedCategory(null);
            categoryList();
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    useEffect(() => {
        addEdgeModeRef.current = addEdgeMode;
        if (!addEdgeMode && selectedSourceRef.current) {
            selectedSourceRef.current.removeClass('selected');
            selectedSourceRef.current = null;
        }
    }, [addEdgeMode]);

    const selectedSourceRef = useRef(null);

    const categoryList = async () => {
        try {
            const { data } = await RcategoryList();
            setCategorys(data.categorys);
        } catch (error) {
            toast.error(error?.response?.data?.message || someThingIsWrong);
        }
    };

    useEffect(() => {
        categoryList();
    }, []);

    useEffect(() => {
        if (categorys) {
            const nodes = categorys.map((category) => ({
                data: { id: category._id.toString(), label: category.name },
            }));

            const edges = categorys.reduce((acc, category) => {
                if (category.parent) {
                    const parentCategory = categorys.find(
                        (cat) => cat._id.toString() === category.parent.toString()
                    );
                    if (parentCategory) {
                        acc.push({
                            data: {
                                source: category._id.toString(),
                                target: parentCategory._id.toString(),
                            },
                        });
                    }
                }
                return acc;
            }, []);

            const cyInstance = Cytoscape({
                container: cyRef.current,
                elements: [...nodes, ...edges],
                style: [
                    {
                        selector: 'node',
                        style: {
                            'background-color': '#ffffff',
                            'label': 'data(label)',
                            'font-size': 14,
                            'text-valign': 'top',
                            'text-halign': 'center',
                            'color': '#ffffff',
                            'text-margin': '0 0 50px 0',
                            'border-width': 2,
                            'border-color': '#000000',
                        },
                    },
                    {
                        selector: 'node.selected',
                        style: {
                            'border-width': 4,
                            'border-color': 'red',
                        },
                    },
                    {
                        selector: 'edge',
                        style: {
                            width: 2,
                            'line-color': '#ccc',
                            'target-arrow-color': '#ccc',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier',
                        },
                    },
                ],
                layout: {
                    name: 'breadthfirst',
                    directed: true,
                    padding: 200,            // افزایش padding برای فاصله بیشتر اطراف گراف
                    spacingFactor: 4.0,      // افزایش فاصله بین نودها
                    avoidOverlap: true,      // جلوگیری از همپوشانی نودها
                    avoidOverlapPadding: 20, // فاصله اضافی برای جلوگیری از همپوشانی
                    animate: true,
                    fit: false,              // جلوگیری از فیت خودکار گراف به container
                },
                zoomingEnabled: true,
                userZoomingEnabled: true,
                panEnabled: true,
                userPanningEnabled: true,
                userDragNodesEnabled: false,
            });

            const handleNodeTap = (event) => {
                const clickedNode = event.target;
                if (addEdgeModeRef.current) {
                    if (!selectedSourceRef.current) {
                        selectedSourceRef.current = clickedNode;
                        clickedNode.addClass('selected');
                        toast('فرزند انتخاب شد. حالا نود پدر را انتخاب کنید.');
                    } else {
                        if (selectedSourceRef.current.id() === clickedNode.id()) {
                            clickedNode.removeClass('selected');
                            selectedSourceRef.current = null;
                            toast('انتخاب فرزند لغو شد.');
                        } else {
                            const childId = selectedSourceRef.current.id();
                            const existingEdges = cyInstance.$(`edge[source="${childId}"]`);
                            if (existingEdges.length > 0) {
                                existingEdges.remove();
                            }
                            cyInstance.add({
                                group: 'edges',
                                data: { source: childId, target: clickedNode.id() },
                            });
                            updateCategory(selectedSourceRef.current.data().id, clickedNode.data().id, undefined);

                            selectedSourceRef.current.removeClass('selected');
                            selectedSourceRef.current = null;
                        }
                    }
                } else {
                    const clickedNodeId = clickedNode.id();
                    const clickedCategory = categorys.find(
                        (category) => category._id.toString() === clickedNodeId
                    );
                    if (clickedCategory) {
                        setSelectedCategory(clickedCategory);
                        if (selectListener) {
                            selectListener(clickedCategory);
                        }
                    }
                }
            };

            const handleEdgeContextTap = (event) => {
                if (addEdgeModeRef.current) {
                    const clickedEdge = event.target;
                    const sourceId = clickedEdge.data('source');
                    const targetId = clickedEdge.data('target');
                    clickedEdge.remove();
                    updateCategory(cyInstance.getElementById(sourceId).data().id, null, undefined);
                }
            };

            cyInstance.on('tap', 'node', handleNodeTap);
            cyInstance.on('cxttap', 'edge', handleEdgeContextTap);

            return () => {
                if (cyInstance) {
                    cyInstance.destroy();
                }
            };
        }
    }, [categorys]);

    return (
        <div className="flex flex-col w-full p-4 bg-primary rounded-lg">
            {!pickMode &&
                <>
                    <CreateCategory categoryList={categoryList} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    <div className="flex grow justify-center items-center mb-4">
                        <button
                            onClick={() => {
                                setAddEdgeMode((prev) => {
                                    if (prev && selectedSourceRef.current) {
                                        selectedSourceRef.current.removeClass('selected');
                                        selectedSourceRef.current = null;
                                    }
                                    return !prev;
                                });
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {addEdgeMode ? "خروج از حالت تغییر/افزودن فلش" : "ورود به حالت تغییر/افزودن فلش"}
                        </button>
                    </div>
                </>
            }
            <div className="flex grow w-full p-2 overflow-x-auto overflow-y-hidden border border-gray-300 rounded-lg shadow-md">
                <div ref={cyRef} className="w-full h-full" style={{ minHeight: '500px' }} />
            </div>
        </div>
    );
}
