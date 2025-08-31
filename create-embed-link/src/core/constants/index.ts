export const FALLBACK_STYLES = `
.rich-link {
  display: flex;
  flex-direction: row;
  border: 1px solid var(--background-modifier-border) !important;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--background-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  text-decoration: none;
}

.rich-link:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.rich-link > a {
  display: flex;
  flex-direction: row;
  color: var(--text-normal);
  text-decoration: none;
  width: 100%;
  height: 100%;
}

/* Thumbnail image on the left */
.rich-link img {
  width: 35% !important;
  height: 120px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
}

/* Content container */
.rich-link div {
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  flex: 1;
}

/* Title */
.rich-link h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  font-weight: bold;
  color: var(--text-normal);
}

/* Description */
.rich-link p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-faint);
}

/* URL */
.rich-link p:last-child {
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-normal);
}

/* Placeholder while fetching metadata */
.rich-link-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border: 1px dashed var(--text-faint);
  border-radius: 12px;
  margin: 0.5rem 0;
  background-color: var(--background-primary);
  color: var(--text-faint);
  font-style: italic;
  font-size: 0.85rem;
  text-align: center;
}
`