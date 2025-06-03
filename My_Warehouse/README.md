# 🏭 Warehouse Management App

A modular and responsive web application built with **React** that allows users to view, filter, search, and edit warehouse details. It provides intuitive navigation between a **warehouse listing page** and a **detailed view with editing capabilities**, following clean UI and modern architectural principles.

---

## 🔗 Live Preview

> _Add your deployed URL here (if available)_

---

## 📸 UI Preview

### 🔍 Listing Page
![Listing Page](./src/assets/Screenshot%20(270).png)

### 📝 Details/Edit Page
![Detail/Edit Page](./src/assets/Screenshot%20(271).png)

---

## 📁 Features Overview

### ✅ Page 1: Warehouse Listing

- **Search by Warehouse Name**
- **Filter by:**
  - City
  - Cluster
  - Space Available (minimum threshold)
- **Responsive layout**
- **Efficient data rendering using Redux and memoized selectors**
- **Clean and modular component structure**

### ✅ Page 2: Warehouse Details & Editing

- Click a warehouse to **view full details**
- **Edit fields**:  
  - Warehouse Name  
  - Cluster  
  - City  
  - Space Available  
  - Live Status (active/inactive)
- **Add Custom Fields** dynamically per warehouse (optional enhancement)
- Changes reflect in the global state using Redux

---

## 🏗️ Tech Stack

- **React** (with Hooks)
- **React Router v6+** for routing
- **Redux Toolkit** for state management
- **HTML5** & **CSS3** for layout and styling
- **LocalStorage / Mock JSON** to persist edits (if backend is not available)

---

